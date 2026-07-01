from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Any, Optional
from app.services.integration_service import IntegrationService
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/integrations", tags=["integrations"])


class CreateConnectionRequest(BaseModel):
    tenant_id: str
    source_type: str
    credentials: Dict[str, Any]


class SyncConnectionRequest(BaseModel):
    connection_id: int
    tenant_id: str


@router.post("/connect")
async def create_connection(request: CreateConnectionRequest):
    """Create a new data source connection"""
    service = IntegrationService()
    result = await service.create_connection(
        tenant_id=request.tenant_id,
        source_type=request.source_type,
        credentials=request.credentials
    )
    
    if not result['success']:
        raise HTTPException(status_code=400, detail=result['error'])
    
    return result


@router.get("/connections/{tenant_id}")
async def get_connections(tenant_id: str):
    """Get all connections for a tenant"""
    service = IntegrationService()
    connections = await service.get_connections(tenant_id)
    return {"connections": connections}


@router.post("/sync")
async def sync_connection(request: SyncConnectionRequest):
    """Sync data from a specific connection"""
    service = IntegrationService()
    result = await service.sync_connection(
        connection_id=request.connection_id,
        tenant_id=request.tenant_id
    )
    
    if not result['success']:
        raise HTTPException(status_code=400, detail=result['error'])
    
    return result


@router.get("/metrics/{tenant_id}")
async def get_all_metrics(tenant_id: str):
    """Get metrics from all active connections"""
    service = IntegrationService()
    metrics = await service.get_all_metrics(tenant_id)
    return {"metrics": metrics}


@router.get("/metrics/{tenant_id}/{source_type}")
async def get_connection_metrics(tenant_id: str, source_type: str):
    """Get metrics for a specific connection"""
    service = IntegrationService()
    metrics = await service.get_connection_metrics(tenant_id, source_type)
    return {"metrics": metrics}
