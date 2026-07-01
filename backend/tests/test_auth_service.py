import pytest
from app.services.auth_service import AuthService
from app.core.security import verify_password, get_password_hash, create_access_token, decode_access_token


class TestSecurity:
    """Test security functions"""
    
    def test_password_hashing(self):
        """Test password hashing and verification"""
        password = "TestPassword123"
        hashed = get_password_hash(password)
        
        # Hash should be different from original
        assert hashed != password
        
        # Verification should work
        assert verify_password(password, hashed) is True
        
        # Wrong password should fail
        assert verify_password("WrongPassword", hashed) is False
    
    def test_jwt_token_creation(self):
        """Test JWT token creation and decoding"""
        data = {"sub": "test@example.com", "tenant_id": "test-tenant"}
        token = create_access_token(data)
        
        # Token should be a string
        assert isinstance(token, str)
        
        # Token should be decodable
        decoded = decode_access_token(token)
        assert decoded is not None
        assert decoded["sub"] == "test@example.com"
        assert decoded["tenant_id"] == "test-tenant"
    
    def test_invalid_token(self):
        """Test decoding invalid token"""
        invalid_token = "invalid.token.here"
        decoded = decode_access_token(invalid_token)
        assert decoded is None


class TestAuthService:
    """Test authentication service"""
    
    @pytest.fixture
    def auth_service(self):
        return AuthService()
    
    @pytest.mark.asyncio
    async def test_create_user(self, auth_service):
        """Test user creation"""
        result = await auth_service.create_user(
            email="test@example.com",
            password="TestPassword123",
            full_name="Test User",
            tenant_id="test-tenant"
        )
        
        # Should succeed
        assert result["success"] is True
        assert "user_id" in result
        assert result["email"] == "test@example.com"
    
    @pytest.mark.asyncio
    async def test_duplicate_user(self, auth_service):
        """Test creating duplicate user should fail"""
        # Create first user
        await auth_service.create_user(
            email="duplicate@example.com",
            password="TestPassword123",
            full_name="Test User",
            tenant_id="test-tenant"
        )
        
        # Try to create duplicate
        result = await auth_service.create_user(
            email="duplicate@example.com",
            password="TestPassword123",
            full_name="Test User",
            tenant_id="test-tenant"
        )
        
        # Should fail
        assert result["success"] is False
        assert "already registered" in result["error"].lower()
    
    @pytest.mark.asyncio
    async def test_authenticate_user(self, auth_service):
        """Test user authentication"""
        # Create user first
        await auth_service.create_user(
            email="auth@example.com",
            password="TestPassword123",
            full_name="Auth User",
            tenant_id="test-tenant"
        )
        
        # Authenticate with correct credentials
        user = await auth_service.authenticate_user("auth@example.com", "TestPassword123")
        assert user is not None
        assert user["email"] == "auth@example.com"
        
        # Authenticate with wrong password
        user = await auth_service.authenticate_user("auth@example.com", "WrongPassword")
        assert user is None
    
    @pytest.mark.asyncio
    async def test_login(self, auth_service):
        """Test login flow"""
        # Create user first
        await auth_service.create_user(
            email="login@example.com",
            password="TestPassword123",
            full_name="Login User",
            tenant_id="test-tenant"
        )
        
        # Login
        result = await auth_service.login("login@example.com", "TestPassword123")
        assert result["success"] is True
        assert "access_token" in result
        assert "user" in result
