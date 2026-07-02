from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.services.auth_service import AuthService
from typing import Optional

security = HTTPBearer()
auth_service = AuthService()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """Dependency to get current authenticated user from JWT token"""
    token = credentials.credentials
    user = await auth_service.get_current_user(token)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user


async def get_current_tenant_id(
    current_user: dict = Depends(get_current_user)
) -> str:
    """Dependency to get current tenant ID from authenticated user"""
    tenant_id = current_user.get("tenant_id")
    
    if not tenant_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User has no tenant ID"
        )
    
    return tenant_id


async def get_current_user_id(
    current_user: dict = Depends(get_current_user)
) -> int:
    """Dependency to get current user ID from authenticated user"""
    user_id = current_user.get("id")
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User has no ID"
        )
    
    return user_id
