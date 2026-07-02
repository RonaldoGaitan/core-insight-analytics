from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.services.query_service import QueryService
from app.core.dependencies import get_current_tenant_id

router = APIRouter()
query_service = QueryService()


class QueryRequest(BaseModel):
    question: str


@router.post("/query")
async def execute_query(
    request: QueryRequest,
    tenant_id: str = Depends(get_current_tenant_id)
):
    """Execute a query with tenant isolation"""
    try:
        result = await query_service.process_question(request.question, tenant_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
