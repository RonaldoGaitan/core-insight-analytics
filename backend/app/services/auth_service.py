from typing import Optional, Dict, Any
from datetime import datetime, timedelta
from sqlalchemy import text
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token, decode_access_token
from app.core.tenant_context import set_tenant_context
import logging

logger = logging.getLogger(__name__)


class AuthService:
    """Service for authentication and user management"""
    
    async def create_user(self, email: str, password: str, full_name: str, tenant_id: str) -> Dict[str, Any]:
        """Create a new user"""
        try:
            # Hash password
            hashed_password = get_password_hash(password)
            
            # Create user with tenant isolation
            with set_tenant_context(tenant_id) as db:
                # Check if user already exists
                check_query = text("SELECT id FROM users WHERE email = :email")
                result = db.execute(check_query, {"email": email})
                if result.fetchone():
                    return {"success": False, "error": "Email already registered"}
                
                # Create user
                insert_query = text("""
                    INSERT INTO users (email, hashed_password, full_name, tenant_id, created_at, updated_at)
                    VALUES (:email, :hashed_password, :full_name, :tenant_id, NOW(), NOW())
                    RETURNING id
                """)
                result = db.execute(insert_query, {
                    "email": email,
                    "hashed_password": hashed_password,
                    "full_name": full_name,
                    "tenant_id": tenant_id
                })
                user_id = result.fetchone()[0]
                
                return {
                    "success": True,
                    "user_id": user_id,
                    "email": email,
                    "full_name": full_name,
                    "tenant_id": tenant_id
                }
                
        except Exception as e:
            logger.error(f"Failed to create user: {str(e)}")
            return {"success": False, "error": str(e)}
    
    async def authenticate_user(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        """Authenticate a user and return user data if valid"""
        try:
            db = next(get_db())
            try:
                query = text("""
                    SELECT id, email, hashed_password, full_name, tenant_id, is_active
                    FROM users
                    WHERE email = :email
                """)
                result = db.execute(query, {"email": email})
                user = result.fetchone()
                
                if not user:
                    return None
                
                user_id, user_email, hashed_password, full_name, tenant_id, is_active = user
                
                if not is_active:
                    return None
                
                if not verify_password(password, hashed_password):
                    return None
                
                return {
                    "id": user_id,
                    "email": user_email,
                    "full_name": full_name,
                    "tenant_id": tenant_id,
                    "is_active": is_active
                }
                
            finally:
                db.close()
                
        except Exception as e:
            logger.error(f"Authentication failed: {str(e)}")
            return None
    
    async def login(self, email: str, password: str) -> Dict[str, Any]:
        """Login a user and return access token"""
        user = await self.authenticate_user(email, password)
        
        if not user:
            return {"success": False, "error": "Invalid credentials"}
        
        # Create access token
        access_token = create_access_token(
            data={"sub": user["email"], "tenant_id": user["tenant_id"], "user_id": user["id"]}
        )
        
        return {
            "success": True,
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user["id"],
                "email": user["email"],
                "full_name": user["full_name"],
                "tenant_id": user["tenant_id"]
            }
        }
    
    async def get_current_user(self, token: str) -> Optional[Dict[str, Any]]:
        """Get current user from JWT token"""
        try:
            payload = decode_access_token(token)
            if not payload:
                return None
            
            email: str = payload.get("sub")
            tenant_id: str = payload.get("tenant_id")
            user_id: int = payload.get("user_id")
            
            if not email or not tenant_id:
                return None
            
            # Verify user still exists and is active
            db = next(get_db())
            try:
                query = text("""
                    SELECT id, email, full_name, tenant_id, is_active
                    FROM users
                    WHERE id = :user_id AND email = :email AND tenant_id = :tenant_id
                """)
                result = db.execute(query, {
                    "user_id": user_id,
                    "email": email,
                    "tenant_id": tenant_id
                })
                user = result.fetchone()
                
                if not user:
                    return None
                
                return {
                    "id": user[0],
                    "email": user[1],
                    "full_name": user[2],
                    "tenant_id": user[3],
                    "is_active": user[4]
                }
                
            finally:
                db.close()
                
        except Exception as e:
            logger.error(f"Failed to get current user: {str(e)}")
            return None
