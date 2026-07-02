from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Any, Optional
from app.services.integration_service import IntegrationService
from app.core.dependencies import get_current_tenant_id
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/integrations", tags=["integrations"])


class CreateConnectionRequest(BaseModel):
    source_type: str
    credentials: Dict[str, Any]


class SyncConnectionRequest(BaseModel):
    connection_id: int


@router.post("/connect")
async def create_connection(
    request: CreateConnectionRequest,
    tenant_id: str = Depends(get_current_tenant_id)
):
    """Create a new data source connection"""
    service = IntegrationService()
    result = await service.create_connection(
        tenant_id=tenant_id,
        source_type=request.source_type,
        credentials=request.credentials
    )
    
    if not result['success']:
        raise HTTPException(status_code=400, detail=result['error'])
    
    return result


@router.get("/connections")
async def get_connections(tenant_id: str = Depends(get_current_tenant_id)):
    """Get all connections for the authenticated tenant"""
    service = IntegrationService()
    connections = await service.get_connections(tenant_id)
    return {"connections": connections}


@router.post("/sync")
async def sync_connection(
    request: SyncConnectionRequest,
    tenant_id: str = Depends(get_current_tenant_id)
):
    """Sync data from a specific connection"""
    service = IntegrationService()
    result = await service.sync_connection(
        connection_id=request.connection_id,
        tenant_id=tenant_id
    )
    
    if not result['success']:
        raise HTTPException(status_code=400, detail=result['error'])
    
    return result


@router.get("/metrics")
async def get_all_metrics(tenant_id: str = Depends(get_current_tenant_id)):
    """Get metrics from all active connections"""
    service = IntegrationService()
    metrics = await service.get_all_metrics(tenant_id)
    return {"metrics": metrics}


@router.get("/metrics/{source_type}")
async def get_connection_metrics(
    source_type: str,
    tenant_id: str = Depends(get_current_tenant_id)
):
    """Get metrics for a specific connection"""
    service = IntegrationService()
    metrics = await service.get_connection_metrics(tenant_id, source_type)
    return {"metrics": metrics}
