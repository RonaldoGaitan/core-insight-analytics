from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
from app.connectors import StripeConnector, ShopifyConnector, GoogleAnalyticsConnector
from app.core.database import get_db
from app.core.tenant_context import set_tenant_context
from sqlalchemy import text
import logging

logger = logging.getLogger(__name__)


class IntegrationService:
    """Service for managing data source integrations"""
    
    def __init__(self):
        self.connectors = {
            'stripe': StripeConnector,
            'shopify': ShopifyConnector,
            'google_analytics': GoogleAnalyticsConnector
        }
    
    async def create_connection(self, tenant_id: str, source_type: str, credentials: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new data source connection"""
        try:
            # Validate source type
            if source_type not in self.connectors:
                return {
                    'success': False,
                    'error': f'Unsupported source type: {source_type}'
                }
            
            # Create connector instance
            connector_class = self.connectors[source_type]
            connector = connector_class(tenant_id, credentials)
            
            # Test authentication
            auth_success = await connector.authenticate()
            if not auth_success:
                return {
                    'success': False,
                    'error': 'Authentication failed'
                }
            
            # Save connection to database with tenant isolation
            with set_tenant_context(tenant_id) as db:
                insert_query = text("""
                    INSERT INTO data_connections 
                    (tenant_id, source_type, credentials, status, created_at, updated_at)
                    VALUES (:tenant_id, :source_type, :credentials, 'active', NOW(), NOW())
                    RETURNING id
                """)
                result = db.execute(insert_query, {
                    'tenant_id': tenant_id,
                    'source_type': source_type,
                    'credentials': str(credentials)
                })
                connection_id = result.fetchone()[0]
                
                return {
                    'success': True,
                    'connection_id': connection_id,
                    'source_type': source_type,
                    'status': 'active'
                }
                
        except Exception as e:
            logger.error(f"Failed to create connection: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    async def get_connections(self, tenant_id: str) -> List[Dict[str, Any]]:
        """Get all connections for a tenant"""
        with set_tenant_context(tenant_id) as db:
            query = text("""
                SELECT id, source_type, status, created_at, updated_at
                FROM data_connections
                ORDER BY created_at DESC
            """)
            result = db.execute(query)
            connections = []
            for row in result:
                connections.append({
                    'id': row[0],
                    'source_type': row[1],
                    'status': row[2],
                    'created_at': row[3].isoformat() if row[3] else None,
                    'updated_at': row[4].isoformat() if row[4] else None
                })
            return connections
    
    async def sync_connection(self, connection_id: int, tenant_id: str) -> Dict[str, Any]:
        """Sync data from a specific connection"""
        try:
            # Get connection details with tenant isolation
            with set_tenant_context(tenant_id) as db:
                query = text("""
                    SELECT source_type, credentials
                    FROM data_connections
                    WHERE id = :connection_id
                """)
                result = db.execute(query, {'connection_id': connection_id})
                row = result.fetchone()
                if not row:
                    return {'success': False, 'error': 'Connection not found'}
                
                source_type = row[0]
                credentials = eval(row[1])  # In production, use proper JSON parsing
            
            # Create connector and sync
            connector_class = self.connectors[source_type]
            connector = connector_class(tenant_id, credentials)
            
            sync_result = await connector.sync()
            
            # Save sync results with tenant isolation
            if sync_result['success']:
                await self._save_sync_data(tenant_id, source_type, sync_result['data'])
                await self._update_last_sync(connection_id, tenant_id)
            
            return sync_result
            
        except Exception as e:
            logger.error(f"Failed to sync connection: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }
    
    async def _save_sync_data(self, tenant_id: str, source_type: str, data: List[Dict[str, Any]]):
        """Save synced data to database with tenant isolation"""
        with set_tenant_context(tenant_id) as db:
            table_name = f"{source_type}_data"
            
            # Insert data
            for item in data:
                insert_query = text(f"""
                    INSERT INTO {table_name}
                    (tenant_id, source, source_id, date, type, description, amount, currency, status, raw_data)
                    VALUES (:tenant_id, :source, :source_id, :date, :type, :description, :amount, :currency, :status, :raw_data::jsonb)
                    ON CONFLICT (tenant_id, source_id) DO UPDATE SET
                        date = EXCLUDED.date,
                        amount = EXCLUDED.amount,
                        status = EXCLUDED.status,
                        raw_data = EXCLUDED.raw_data
                """)
                db.execute(insert_query, {
                    'tenant_id': tenant_id,
                    'source': item['source'],
                    'source_id': item['source_id'],
                    'date': item['date'],
                    'type': item['type'],
                    'description': item['description'],
                    'amount': item['amount'],
                    'currency': item['currency'],
                    'status': item['status'],
                    'raw_data': item['raw_data']
                })
    
    async def _update_last_sync(self, connection_id: int, tenant_id: str):
        """Update last sync timestamp with tenant isolation"""
        with set_tenant_context(tenant_id) as db:
            update_query = text("""
                UPDATE data_connections
                SET updated_at = NOW()
                WHERE id = :connection_id
            """)
            db.execute(update_query, {'connection_id': connection_id})
    
    async def get_connection_metrics(self, tenant_id: str, source_type: str) -> Dict[str, Any]:
        """Get metrics for a specific connection"""
        try:
            # Get connection credentials with tenant isolation
            with set_tenant_context(tenant_id) as db:
                query = text("""
                    SELECT credentials
                    FROM data_connections
                    WHERE source_type = :source_type AND status = 'active'
                    ORDER BY created_at DESC
                    LIMIT 1
                """)
                result = db.execute(query, {'source_type': source_type})
                row = result.fetchone()
                if not row:
                    return {}
                
                credentials = eval(row[0])
            
            # Create connector and get metrics
            connector_class = self.connectors[source_type]
            connector = connector_class(tenant_id, credentials)
            
            metrics = await connector.get_metrics()
            return metrics
            
        except Exception as e:
            logger.error(f"Failed to get connection metrics: {str(e)}")
            return {}
    
    async def get_all_metrics(self, tenant_id: str) -> Dict[str, Any]:
        """Get metrics from all active connections"""
        connections = await self.get_connections(tenant_id)
        all_metrics = {}
        
        for conn in connections:
            if conn['status'] == 'active':
                metrics = await self.get_connection_metrics(tenant_id, conn['source_type'])
                if metrics:
                    all_metrics[conn['source_type']] = metrics
        
        return all_metrics
