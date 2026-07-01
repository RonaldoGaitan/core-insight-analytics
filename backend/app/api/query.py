from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.query_service import QueryService

router = APIRouter()
query_service = QueryService()


class QueryRequest(BaseModel):
    question: str


@router.post("/query")
async def execute_query(request: QueryRequest):
    try:
        result = await query_service.process_question(request.question)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
