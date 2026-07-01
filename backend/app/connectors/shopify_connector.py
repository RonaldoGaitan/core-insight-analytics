import httpx
from typing import Dict, Any, List
from datetime import datetime, timedelta
from .base import BaseConnector
import logging

logger = logging.getLogger(__name__)


class ShopifyConnector(BaseConnector):
    """Connector for Shopify API to fetch orders and customers"""
    
    def __init__(self, tenant_id: str, credentials: Dict[str, Any]):
        super().__init__(tenant_id, credentials)
        self.shop_url = credentials.get('shop_url', '').rstrip('/')
        self.access_token = credentials.get('access_token')
        self.base_url = f"{self.shop_url}/admin/api/2024-01"
        self.headers = {
            "X-Shopify-Access-Token": self.access_token,
            "Content-Type": "application/json"
        }
    
    async def authenticate(self) -> bool:
        """Test Shopify credentials"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/shop.json",
                    headers=self.headers
                )
                response.raise_for_status()
                return True
        except Exception as e:
            logger.error(f"Shopify authentication failed: {str(e)}")
            return False
    
    async def fetch_data(self, start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
        """Fetch Shopify orders and customers"""
        raw_data = []
        
        try:
            # Fetch orders
            orders = await self.fetch_orders(
                limit=250,
                status="any",
                created_at_min=start_date.isoformat(),
                created_at_max=end_date.isoformat()
            )
            raw_data.extend(orders)
            
            # Fetch customers
            customers = await self.fetch_customers(limit=250)
            raw_data.extend(customers)
            
            return raw_data
            
        except Exception as e:
            logger.error(f"Failed to fetch Shopify data: {str(e)}")
            raise
    
    async def fetch_orders(self, limit: int = 250, status: str = "any", 
                          created_at_min: str = None, created_at_max: str = None) -> List[Dict[str, Any]]:
        """Fetch orders from Shopify"""
        params = {"limit": limit, "status": status}
        if created_at_min:
            params["created_at_min"] = created_at_min
        if created_at_max:
            params["created_at_max"] = created_at_max
            
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/orders.json",
                headers=self.headers,
                params=params
            )
            response.raise_for_status()
            return response.json().get("orders", [])
    
    async def fetch_customers(self, limit: int = 250) -> List[Dict[str, Any]]:
        """Fetch customers from Shopify"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/customers.json",
                headers=self.headers,
                params={"limit": limit}
            )
            response.raise_for_status()
            return response.json().get("customers", [])
    
    async def get_metrics(self) -> Dict[str, Any]:
        """Get Shopify summary metrics"""
        try:
            # Fetch recent orders for metrics
            orders = await self.fetch_orders(limit=250)
            
            total_revenue = 0
            total_orders = len(orders)
            fulfilled_orders = 0
            pending_orders = 0
            
            for order in orders:
                total_revenue += float(order.get('total_price', 0))
                if order.get('fulfillment_status') == 'fulfilled':
                    fulfilled_orders += 1
                elif order.get('fulfillment_status') == 'pending':
                    pending_orders += 1
            
            # Fetch customers
            customers = await self.fetch_customers(limit=250)
            total_customers = len(customers)
            
            avg_order_value = total_revenue / total_orders if total_orders > 0 else 0
            
            return {
                'total_revenue': round(total_revenue, 2),
                'total_orders': total_orders,
                'total_customers': total_customers,
                'fulfilled_orders': fulfilled_orders,
                'pending_orders': pending_orders,
                'average_order_value': round(avg_order_value, 2),
                'currency': 'USD'
            }
            
        except Exception as e:
            logger.error(f"Failed to get Shopify metrics: {str(e)}")
            return {}
    
    def normalize_data(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Normalize Shopify data to standard format"""
        normalized = []
        
        for item in raw_data:
            # Check if it's an order or customer
            if 'email' in item and 'total_price' in item:
                # It's an order
                normalized_item = {
                    'source': 'shopify',
                    'source_id': str(item.get('id')),
                    'date': item.get('created_at'),
                    'type': 'order',
                    'description': f"Order #{item.get('id')}",
                    'amount': float(item.get('total_price', 0)),
                    'currency': item.get('currency', 'USD'),
                    'status': item.get('financial_status', 'unknown'),
                    'raw_data': item
                }
            else:
                # It's a customer
                normalized_item = {
                    'source': 'shopify',
                    'source_id': str(item.get('id')),
                    'date': item.get('created_at'),
                    'type': 'customer',
                    'description': f"Customer: {item.get('email', 'Unknown')}",
                    'amount': float(item.get('total_spent', 0)),
                    'currency': 'USD',
                    'status': item.get('state', 'unknown'),
                    'raw_data': item
                }
            normalized.append(normalized_item)
        
        return normalized
    
    def transform_orders(self, raw_orders: List[Dict]) -> List[Dict[str, Any]]:
        """Transform raw Shopify orders to standard format"""
        transformed = []
        for order in raw_orders:
            transformed.append({
                "id": str(order.get("id")),
                "customer_id": str(order.get("customer", {}).get("id", "")),
                "email": order.get("email", ""),
                "created_at": order.get("created_at"),
                "updated_at": order.get("updated_at"),
                "total_price": float(order.get("total_price", 0)),
                "subtotal_price": float(order.get("subtotal_price", 0)),
                "total_tax": float(order.get("total_tax", 0)),
                "financial_status": order.get("financial_status"),
                "fulfillment_status": order.get("fulfillment_status"),
                "currency": order.get("currency"),
                "source": "shopify"
            })
        return transformed
    
    def transform_customers(self, raw_customers: List[Dict]) -> List[Dict[str, Any]]:
        """Transform raw Shopify customers to standard format"""
        transformed = []
        for customer in raw_customers:
            transformed.append({
                "id": str(customer.get("id")),
                "email": customer.get("email", ""),
                "first_name": customer.get("first_name", ""),
                "last_name": customer.get("last_name", ""),
                "created_at": customer.get("created_at"),
                "updated_at": customer.get("updated_at"),
                "orders_count": customer.get("orders_count", 0),
                "total_spent": float(customer.get("total_spent", 0)),
                "state": customer.get("state"),
                "source": "shopify"
            })
        return transformed
    
    async def sync_to_database(self, tenant_id: str, table_name: str, data: List[Dict]):
        """Sync transformed data to database"""
        from sqlalchemy import text
        from app.core.database import get_db
        
        db = next(get_db())
        try:
            # Create table if not exists (simplified - in production use proper migrations)
            if table_name == "shopify_orders":
                create_query = text("""
                    CREATE TABLE IF NOT EXISTS shopify_orders (
                        id VARCHAR(255) PRIMARY KEY,
                        customer_id VARCHAR(255),
                        email VARCHAR(255),
                        created_at TIMESTAMP,
                        updated_at TIMESTAMP,
                        total_price DECIMAL(10,2),
                        subtotal_price DECIMAL(10,2),
                        total_tax DECIMAL(10,2),
                        financial_status VARCHAR(50),
                        fulfillment_status VARCHAR(50),
                        currency VARCHAR(10),
                        source VARCHAR(50),
                        tenant_id VARCHAR(255)
                    )
                """)
                db.execute(create_query)
                
                # Insert/upsert data
                for record in data:
                    upsert_query = text("""
                        INSERT INTO shopify_orders 
                        (id, customer_id, email, created_at, updated_at, total_price, 
                         subtotal_price, total_tax, financial_status, fulfillment_status, 
                         currency, source, tenant_id)
                        VALUES (:id, :customer_id, :email, :created_at, :updated_at, :total_price,
                                :subtotal_price, :total_tax, :financial_status, :fulfillment_status,
                                :currency, :source, :tenant_id)
                        ON CONFLICT (id) DO UPDATE SET
                            customer_id = EXCLUDED.customer_id,
                            email = EXCLUDED.email,
                            updated_at = EXCLUDED.updated_at,
                            total_price = EXCLUDED.total_price,
                            financial_status = EXCLUDED.financial_status,
                            fulfillment_status = EXCLUDED.fulfillment_status
                    """)
                    db.execute(upsert_query, {**record, "tenant_id": tenant_id})
            
            elif table_name == "shopify_customers":
                create_query = text("""
                    CREATE TABLE IF NOT EXISTS shopify_customers (
                        id VARCHAR(255) PRIMARY KEY,
                        email VARCHAR(255),
                        first_name VARCHAR(255),
                        last_name VARCHAR(255),
                        created_at TIMESTAMP,
                        updated_at TIMESTAMP,
                        orders_count INTEGER,
                        total_spent DECIMAL(10,2),
                        state VARCHAR(50),
                        source VARCHAR(50),
                        tenant_id VARCHAR(255)
                    )
                """)
                db.execute(create_query)
                
                for record in data:
                    upsert_query = text("""
                        INSERT INTO shopify_customers
                        (id, email, first_name, last_name, created_at, updated_at, 
                         orders_count, total_spent, state, source, tenant_id)
                        VALUES (:id, :email, :first_name, :last_name, :created_at, :updated_at,
                                :orders_count, :total_spent, :state, :source, :tenant_id)
                        ON CONFLICT (id) DO UPDATE SET
                            email = EXCLUDED.email,
                            updated_at = EXCLUDED.updated_at,
                            orders_count = EXCLUDED.orders_count,
                            total_spent = EXCLUDED.total_spent,
                            state = EXCLUDED.state
                    """)
                    db.execute(upsert_query, {**record, "tenant_id": tenant_id})
            
            db.commit()
        finally:
            db.close()
