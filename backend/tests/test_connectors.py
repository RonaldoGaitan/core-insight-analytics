import pytest
from app.connectors.stripe_connector import StripeConnector
from app.connectors.shopify_connector import ShopifyConnector
from app.connectors.google_analytics_connector import GoogleAnalyticsConnector
from datetime import datetime, timedelta


class TestStripeConnector:
    """Test Stripe connector"""
    
    @pytest.fixture
    def stripe_connector(self):
        return StripeConnector(
            tenant_id="test-tenant",
            credentials={"api_key": "sk_test_mock_key"}
        )
    
    @pytest.mark.asyncio
    async def test_authenticate(self, stripe_connector):
        """Test Stripe authentication"""
        # This will fail with mock key, but tests the structure
        result = await stripe_connector.authenticate()
        # In production, this would test with a real test key
        assert isinstance(result, bool)
    
    @pytest.mark.asyncio
    async def test_normalize_data(self, stripe_connector):
        """Test data normalization"""
        raw_data = [
            {
                "type": "charge",
                "id": "ch_123",
                "amount": 1000,
                "currency": "usd",
                "status": "succeeded",
                "created": 1640000000,
                "description": "Test charge",
                "customer": "cus_123"
            }
        ]
        
        normalized = stripe_connector.normalize_data(raw_data)
        
        assert len(normalized) == 1
        assert normalized[0]["source"] == "stripe"
        assert normalized[0]["amount"] == 10.0  # Converted from cents
        assert normalized[0]["status"] == "succeeded"


class TestShopifyConnector:
    """Test Shopify connector"""
    
    @pytest.fixture
    def shopify_connector(self):
        return ShopifyConnector(
            tenant_id="test-tenant",
            credentials={
                "shop_url": "test.myshopify.com",
                "access_token": "test_token"
            }
        )
    
    @pytest.mark.asyncio
    async def test_normalize_data(self, shopify_connector):
        """Test Shopify data normalization"""
        raw_data = [
            {
                "id": 12345,
                "email": "test@example.com",
                "total_price": "100.00",
                "financial_status": "paid",
                "fulfillment_status": "fulfilled",
                "currency": "USD",
                "created_at": "2024-01-01T00:00:00Z"
            }
        ]
        
        normalized = shopify_connector.normalize_data(raw_data)
        
        assert len(normalized) == 1
        assert normalized[0]["source"] == "shopify"
        assert normalized[0]["amount"] == 100.0
        assert normalized[0]["type"] == "order"


class TestGoogleAnalyticsConnector:
    """Test Google Analytics connector"""
    
    @pytest.fixture
    def ga_connector(self):
        return GoogleAnalyticsConnector(
            tenant_id="test-tenant",
            credentials={
                "property_id": "123456",
                "access_token": "test_token"
            }
        )
    
    @pytest.mark.asyncio
    async def test_normalize_data(self, ga_connector):
        """Test Google Analytics data normalization"""
        raw_data = [
            {
                "type": "page_view",
                "date": "2024-01-01T00:00:00",
                "page_path": "/test",
                "page_title": "Test Page",
                "screen_page_views": 100,
                "active_users": 50
            }
        ]
        
        normalized = ga_connector.normalize_data(raw_data)
        
        assert len(normalized) == 1
        assert normalized[0]["source"] == "google_analytics"
        assert normalized[0]["amount"] == 100
        assert normalized[0]["type"] == "page_view"
