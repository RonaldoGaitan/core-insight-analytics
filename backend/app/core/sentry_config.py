import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


def init_sentry():
    """Initialize Sentry for error monitoring"""
    sentry_dsn = getattr(settings, 'SENTRY_DSN', None)
    
    if sentry_dsn:
        sentry_sdk.init(
            dsn=sentry_dsn,
            integrations=[
                FastApiIntegration(),
                SqlalchemyIntegration()
            ],
            traces_sample_rate=0.1,  # Sample 10% of transactions for performance monitoring
            environment="production" if sentry_dsn else "development",
            send_default_pii=False,
            before_send=before_send_event
        )
        logger.info("Sentry initialized successfully")
    else:
        logger.info("Sentry DSN not configured, skipping initialization")


def before_send_event(event, hint):
    """Filter events before sending to Sentry"""
    # Filter out health check errors
    if 'exc_info' in hint:
        exc_type, exc_value, exc_tb = hint['exc_info']
        if exc_type and 'health' in str(exc_type).lower():
            return None
    
    # Add custom context
    event['contexts']['app'] = {
        'name': 'CoreInsight Analytics',
        'version': '1.0.0'
    }
    
    return event
