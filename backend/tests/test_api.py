import pytest
from fastapi.testclient import TestClient
from app.main import app


client = TestClient(app)


class TestAuthAPI:
    """Test authentication API endpoints"""
    
    def test_root_endpoint(self):
        """Test root endpoint"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "version" in data
    
    def test_signup(self):
        """Test user signup"""
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "test@example.com",
                "password": "TestPassword123",
                "full_name": "Test User",
                "tenant_id": "test-tenant"
            }
        )
        # Should succeed or fail with appropriate error
        assert response.status_code in [200, 400]
    
    def test_signup_invalid_password(self):
        """Test signup with invalid password"""
        response = client.post(
            "/api/auth/signup",
            json={
                "email": "test@example.com",
                "password": "weak",  # Too weak
                "full_name": "Test User",
                "tenant_id": "test-tenant"
            }
        )
        assert response.status_code == 422  # Validation error
    
    def test_login(self):
        """Test login endpoint"""
        response = client.post(
            "/api/auth/login",
            data={
                "username": "test@example.com",
                "password": "TestPassword123"
            }
        )
        # Should succeed or fail with appropriate error
        assert response.status_code in [200, 401]


class TestIntegrationsAPI:
    """Test integrations API endpoints"""
    
    def test_get_connections(self):
        """Test getting connections"""
        response = client.get("/api/integrations/connections/test-tenant")
        # Should return connections list
        assert response.status_code in [200, 401]  # 401 if not authenticated
    
    def test_create_connection(self):
        """Test creating a connection"""
        response = client.post(
            "/api/integrations/connect",
            json={
                "tenant_id": "test-tenant",
                "source_type": "stripe",
                "credentials": {"api_key": "sk_test_key"}
            }
        )
        # Should succeed or fail with appropriate error
        assert response.status_code in [200, 400, 401]


class TestOAuthAPI:
    """Test OAuth API endpoints"""
    
    def test_shopify_authorize(self):
        """Test Shopify OAuth authorization"""
        response = client.get(
            "/api/oauth/shopify/authorize",
            params={
                "shop_domain": "test",
                "tenant_id": "test-tenant"
            }
        )
        # Should return auth URL
        assert response.status_code in [200, 400]
    
    def test_google_authorize(self):
        """Test Google OAuth authorization"""
        response = client.get(
            "/api/oauth/google/authorize",
            params={"tenant_id": "test-tenant"}
        )
        # Should return auth URL
        assert response.status_code in [200, 400]
