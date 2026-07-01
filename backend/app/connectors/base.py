from abc import ABC, abstractmethod
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)


class BaseConnector(ABC):
    """Base class for all data source connectors"""
    
    def __init__(self, tenant_id: str, credentials: Dict[str, Any]):
        self.tenant_id = tenant_id
        self.credentials = credentials
        self.last_sync = None
    
    @abstractmethod
    async def authenticate(self) -> bool:
        """Authenticate with the data source"""
        pass
    
    @abstractmethod
    async def fetch_data(self, start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
        """Fetch data from the source for a date range"""
        pass
    
    @abstractmethod
    async def get_metrics(self) -> Dict[str, Any]:
        """Get summary metrics from the source"""
        pass
    
    @abstractmethod
    def normalize_data(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Normalize raw data to standard format"""
        pass
    
    async def sync(self, start_date: Optional[datetime] = None, end_date: Optional[datetime] = None) -> Dict[str, Any]:
        """Main sync method - authenticate, fetch, normalize, and return results"""
        try:
            # Authenticate
            auth_success = await self.authenticate()
            if not auth_success:
                raise Exception("Authentication failed")
            
            # Set default date range if not provided
            if not end_date:
                end_date = datetime.now()
            if not start_date:
                start_date = end_date - timedelta(days=30)
            
            # Fetch raw data
            raw_data = await self.fetch_data(start_date, end_date)
            
            # Normalize data
            normalized_data = self.normalize_data(raw_data)
            
            # Get metrics
            metrics = await self.get_metrics()
            
            self.last_sync = datetime.now()
            
            return {
                'success': True,
                'records_processed': len(normalized_data),
                'data': normalized_data,
                'metrics': metrics,
                'synced_at': self.last_sync.isoformat()
            }
            
        except Exception as e:
            logger.error(f"Sync failed for {self.__class__.__name__}: {str(e)}")
            return {
                'success': False,
                'error': str(e),
                'synced_at': datetime.now().isoformat()
            }
    
    def get_connection_info(self) -> Dict[str, str]:
        """Get connection information for display"""
        return {
            'connector_type': self.__class__.__name__,
            'tenant_id': self.tenant_id,
            'last_sync': self.last_sync.isoformat() if self.last_sync else None
        }
