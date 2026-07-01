from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from app.services.oauth_service import oauth_service
from app.services.integration_service import IntegrationService
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/oauth", tags=["oauth"])


class ShopifyAuthRequest(BaseModel):
    shop_domain: str
    tenant_id: str


class GoogleAuthRequest(BaseModel):
    tenant_id: str


@router.get("/shopify/authorize")
async def shopify_authorize(shop_domain: str = Query(...), tenant_id: str = Query(...)):
    """Get Shopify OAuth authorization URL"""
    try:
        auth_url = oauth_service.get_shopify_auth_url(shop_domain, tenant_id)
        return {"auth_url": auth_url}
    except Exception as e:
        logger.error(f"Shopify authorization failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/shopify/callback")
async def shopify_callback(
    code: str = Query(...),
    shop: str = Query(...),
    state: str = Query(...)
):
    """Handle Shopify OAuth callback"""
    try:
        # Verify state
        state_data = oauth_service.verify_state(state)
        if not state_data:
            raise HTTPException(status_code=400, detail="Invalid state")
        
        tenant_id = state_data["tenant_id"]
        
        # Exchange code for access token
        tokens = await oauth_service.exchange_shopify_code(shop, code)
        
        # Create connection
        integration_service = IntegrationService()
        result = await integration_service.create_connection(
            tenant_id=tenant_id,
            source_type="shopify",
            credentials={
                "shop_url": f"https://{shop}",
                "access_token": tokens["access_token"]
            }
        )
        
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["error"])
        
        return {
            "success": True,
            "message": "Shopify connected successfully",
            "connection_id": result["connection_id"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Shopify callback failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to complete Shopify connection")


@router.get("/google/authorize")
async def google_authorize(tenant_id: str = Query(...)):
    """Get Google Analytics OAuth authorization URL"""
    try:
        auth_url = oauth_service.get_google_auth_url(tenant_id)
        return {"auth_url": auth_url}
    except Exception as e:
        logger.error(f"Google authorization failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/google/callback")
async def google_callback(
    code: str = Query(...),
    state: str = Query(...)
):
    """Handle Google Analytics OAuth callback"""
    try:
        # Verify state
        state_data = oauth_service.verify_state(state)
        if not state_data:
            raise HTTPException(status_code=400, detail="Invalid state")
        
        tenant_id = state_data["tenant_id"]
        
        # Exchange code for access token
        tokens = await oauth_service.exchange_google_code(code)
        
        # Create connection
        integration_service = IntegrationService()
        result = await integration_service.create_connection(
            tenant_id=tenant_id,
            source_type="google_analytics",
            credentials={
                "access_token": tokens["access_token"],
                "refresh_token": tokens.get("refresh_token"),
                "client_id": oauth_service.google_config["client_id"],
                "client_secret": oauth_service.google_config["client_secret"]
            }
        )
        
        if not result["success"]:
            raise HTTPException(status_code=400, detail=result["error"])
        
        return {
            "success": True,
            "message": "Google Analytics connected successfully",
            "connection_id": result["connection_id"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Google callback failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to complete Google connection")
