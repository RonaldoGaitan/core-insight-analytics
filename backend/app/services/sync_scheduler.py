from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from typing import Dict, Any
from app.services.integration_service import IntegrationService
from app.core.database import get_db
from sqlalchemy import text
import logging

logger = logging.getLogger(__name__)


class SyncScheduler:
    """Scheduler for automatic data sync from integrations"""
    
    def __init__(self):
        self.scheduler = AsyncIOScheduler()
        self.integration_service = IntegrationService()
    
    async def sync_all_connections(self):
        """Sync all active connections for all tenants"""
        try:
            db = next(get_db())
            try:
                # Get all active connections
                query = text("""
                    SELECT id, tenant_id, source_type
                    FROM data_connections
                    WHERE status = 'active'
                """)
                result = db.execute(query)
                connections = result.fetchall()
                
                logger.info(f"Found {len(connections)} active connections to sync")
                
                for conn in connections:
                    connection_id, tenant_id, source_type = conn
                    try:
                        logger.info(f"Syncing connection {connection_id} for tenant {tenant_id}")
                        sync_result = await self.integration_service.sync_connection(
                            connection_id=connection_id,
                            tenant_id=tenant_id
                        )
                        
                        if sync_result['success']:
                            logger.info(f"Successfully synced {source_type} for tenant {tenant_id}")
                        else:
                            logger.error(f"Failed to sync {source_type} for tenant {tenant_id}: {sync_result.get('error')}")
                            
                    except Exception as e:
                        logger.error(f"Error syncing connection {connection_id}: {str(e)}")
                        
            finally:
                db.close()
                
        except Exception as e:
            logger.error(f"Error in sync_all_connections: {str(e)}")
    
    def start(self, interval_minutes: int = 60):
        """Start the scheduler with specified interval"""
        self.scheduler.add_job(
            self.sync_all_connections,
            trigger=IntervalTrigger(minutes=interval_minutes),
            id='sync_all_connections',
            name='Sync all data connections',
            replace_existing=True
        )
        self.scheduler.start()
        logger.info(f"Sync scheduler started with {interval_minutes} minute interval")
    
    def stop(self):
        """Stop the scheduler"""
        self.scheduler.shutdown()
        logger.info("Sync scheduler stopped")
    
    async def trigger_sync_now(self):
        """Trigger an immediate sync of all connections"""
        await self.sync_all_connections()


# Global scheduler instance
sync_scheduler = SyncScheduler()
