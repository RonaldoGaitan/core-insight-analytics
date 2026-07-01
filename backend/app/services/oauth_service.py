from typing import Dict, Any, Optional
from fastapi import HTTPException
import httpx
import secrets
import logging

logger = logging.getLogger(__name__)


class OAuthService:
    """Service for handling OAuth flows for third-party integrations"""
    
    def __init__(self):
        # OAuth states storage (in production, use Redis)
        self.oauth_states = {}
        
        # OAuth configuration (in production, load from environment)
        self.shopify_config = {
            "client_id": "your-shopify-client-id",
            "client_secret": "your-shopify-client-secret",
            "scopes": "read_products,read_orders,read_customers",
            "redirect_uri": "http://localhost:8000/api/oauth/shopify/callback"
        }
        
        self.google_config = {
            "client_id": "your-google-client-id",
            "client_secret": "your-google-client-secret",
            "scopes": "https://www.googleapis.com/auth/analytics.readonly",
            "redirect_uri": "http://localhost:8000/api/oauth/google/callback"
        }
    
    def generate_state(self) -> str:
        """Generate a random state string for OAuth security"""
        return secrets.token_urlsafe(32)
    
    def save_state(self, state: str, tenant_id: str, source_type: str):
        """Save OAuth state for later verification"""
        self.oauth_states[state] = {
            "tenant_id": tenant_id,
            "source_type": source_type,
            "created_at": datetime.now()
        }
    
    def verify_state(self, state: str) -> Optional[Dict[str, Any]]:
        """Verify and retrieve OAuth state"""
        return self.oauth_states.pop(state, None)
    
    def get_shopify_auth_url(self, shop_domain: str, tenant_id: str) -> str:
        """Generate Shopify OAuth authorization URL"""
        state = self.generate_state()
        self.save_state(state, tenant_id, "shopify")
        
        auth_url = (
            f"https://{shop_domain}.myshopify.com/admin/oauth/authorize"
            f"?client_id={self.shopify_config['client_id']}"
            f"&scope={self.shopify_config['scopes']}"
            f"&redirect_uri={self.shopify_config['redirect_uri']}"
            f"&state={state}"
        )
        return auth_url
    
    async def exchange_shopify_code(self, shop_domain: str, code: str) -> Dict[str, Any]:
        """Exchange Shopify authorization code for access token"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"https://{shop_domain}.myshopify.com/admin/oauth/access_token",
                    data={
                        "client_id": self.shopify_config["client_id"],
                        "client_secret": self.shopify_config["client_secret"],
                        "code": code
                    }
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Shopify token exchange failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Failed to exchange Shopify code")
    
    def get_google_auth_url(self, tenant_id: str) -> str:
        """Generate Google Analytics OAuth authorization URL"""
        state = self.generate_state()
        self.save_state(state, tenant_id, "google_analytics")
        
        auth_url = (
            "https://accounts.google.com/o/oauth2/v2/auth"
            f"?client_id={self.google_config['client_id']}"
            f"&redirect_uri={self.google_config['redirect_uri']}"
            f"&scope={self.google_config['scopes']}"
            f"&response_type=code"
            f"&state={state}"
            f"&access_type=offline"
            f"&prompt=consent"
        )
        return auth_url
    
    async def exchange_google_code(self, code: str) -> Dict[str, Any]:
        """Exchange Google authorization code for access token"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://oauth2.googleapis.com/token",
                    data={
                        "client_id": self.google_config["client_id"],
                        "client_secret": self.google_config["client_secret"],
                        "code": code,
                        "grant_type": "authorization_code",
                        "redirect_uri": self.google_config["redirect_uri"]
                    }
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Google token exchange failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Failed to exchange Google code")
    
    async def refresh_google_token(self, refresh_token: str) -> Dict[str, Any]:
        """Refresh Google Analytics access token"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://oauth2.googleapis.com/token",
                    data={
                        "client_id": self.google_config["client_id"],
                        "client_secret": self.google_config["client_secret"],
                        "refresh_token": refresh_token,
                        "grant_type": "refresh_token"
                    }
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Google token refresh failed: {str(e)}")
            raise HTTPException(status_code=400, detail="Failed to refresh Google token")


# Global OAuth service instance
oauth_service = OAuthService()
