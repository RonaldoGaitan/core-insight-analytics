from contextlib import contextmanager
from sqlalchemy import text
from app.core.database import get_db
import logging

logger = logging.getLogger(__name__)


@contextmanager
def set_tenant_context(tenant_id: str):
    """Context manager to set tenant isolation for database operations"""
    db = next(get_db())
    try:
        # Set the tenant context for this session
        db.execute(text("SET app.current_tenant_id = :tenant_id"), {"tenant_id": tenant_id})
        yield db
        db.commit()
    except Exception as e:
        db.rollback()
        logger.error(f"Error in tenant context: {str(e)}")
        raise
    finally:
        # Clear the tenant context
        try:
            db.execute(text("RESET app.current_tenant_id"))
        except:
            pass
        db.close()


def get_tenant_id_from_user(user_id: str) -> str:
    """Get tenant ID for a user (implement based on your auth system)"""
    # In production, this would query your users table
    # For now, return a default or implement your logic
    return user_id  # Assuming user_id = tenant_id for now


class TenantIsolationMiddleware:
    """Middleware to ensure tenant context is set for all requests"""
    
    def __init__(self):
        self.current_tenant = None
    
    def set_tenant(self, tenant_id: str):
        """Set the current tenant for this request"""
        self.current_tenant = tenant_id
    
    def get_tenant(self) -> str:
        """Get the current tenant"""
        return self.current_tenant
    
    def clear_tenant(self):
        """Clear the current tenant"""
        self.current_tenant = None


# Global middleware instance
tenant_middleware = TenantIsolationMiddleware()
