import stripe
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
from .base import BaseConnector
import logging

logger = logging.getLogger(__name__)


class StripeConnector(BaseConnector):
    """Stripe connector for payment and transaction data"""
    
    def __init__(self, tenant_id: str, credentials: Dict[str, Any]):
        super().__init__(tenant_id, credentials)
        self.api_key = credentials.get('api_key')
        stripe.api_key = self.api_key
    
    async def authenticate(self) -> bool:
        """Test API key validity"""
        try:
            # Try to fetch account info to validate key
            account = stripe.Account.retrieve()
            return account is not None
        except Exception as e:
            logger.error(f"Stripe authentication failed: {str(e)}")
            return False
    
    async def fetch_data(self, start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
        """Fetch Stripe charges and payments"""
        try:
            # Fetch charges
            charges = stripe.Charge.list(
                created={
                    'gte': int(start_date.timestamp()),
                    'lte': int(end_date.timestamp())
                },
                limit=100
            )
            
            # Fetch balance transactions
            balance_txns = stripe.BalanceTransaction.list(
                created={
                    'gte': int(start_date.timestamp()),
                    'lte': int(end_date.timestamp())
                },
                limit=100
            )
            
            # Combine data
            raw_data = []
            
            for charge in charges.auto_paging_iter():
                raw_data.append({
                    'type': 'charge',
                    'id': charge.id,
                    'amount': charge.amount / 100,  # Convert from cents
                    'currency': charge.currency,
                    'status': charge.status,
                    'created': datetime.fromtimestamp(charge.created).isoformat(),
                    'description': charge.description,
                    'customer': charge.get('customer'),
                    'metadata': charge.metadata
                })
            
            for txn in balance_txns.auto_paging_iter():
                raw_data.append({
                    'type': 'balance_transaction',
                    'id': txn.id,
                    'amount': txn.amount / 100,
                    'currency': txn.currency,
                    'status': txn.status,
                    'created': datetime.fromtimestamp(txn.created).isoformat(),
                    'description': txn.description,
                    'source': txn.source
                })
            
            return raw_data
            
        except Exception as e:
            logger.error(f"Failed to fetch Stripe data: {str(e)}")
            raise
    
    async def get_metrics(self) -> Dict[str, Any]:
        """Get Stripe summary metrics"""
        try:
            # Get recent charges for metrics
            charges = stripe.Charge.list(limit=100)
            
            total_revenue = 0
            successful_count = 0
            failed_count = 0
            refund_count = 0
            
            for charge in charges.auto_paging_iter():
                if charge.status == 'succeeded':
                    total_revenue += charge.amount / 100
                    successful_count += 1
                elif charge.status == 'failed':
                    failed_count += 1
                elif charge.refunded:
                    refund_count += 1
            
            success_rate = (successful_count / len(list(charges.auto_paging_iter()))) * 100 if charges else 0
            avg_transaction = total_revenue / successful_count if successful_count > 0 else 0
            
            return {
                'total_revenue': total_revenue,
                'total_transactions': successful_count + failed_count,
                'successful_transactions': successful_count,
                'failed_transactions': failed_count,
                'refunded_transactions': refund_count,
                'success_rate': round(success_rate, 2),
                'average_transaction': round(avg_transaction, 2),
                'currency': 'USD'
            }
            
        except Exception as e:
            logger.error(f"Failed to get Stripe metrics: {str(e)}")
            return {}
    
    def normalize_data(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Normalize Stripe data to standard format"""
        normalized = []
        
        for item in raw_data:
            normalized_item = {
                'source': 'stripe',
                'source_id': item['id'],
                'date': item['created'],
                'type': item['type'],
                'description': item.get('description', ''),
                'amount': item['amount'],
                'currency': item.get('currency', 'USD'),
                'status': item['status'],
                'raw_data': item
            }
            normalized.append(normalized_item)
        
        return normalized
