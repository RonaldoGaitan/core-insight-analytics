from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.core.dependencies import get_current_tenant_id, get_current_user_id
from anthropic import Anthropic
from app.core.config import settings
import json

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


class WidgetConfig(BaseModel):
    widget_id: Optional[str] = None
    widget_type: str  # kpi_card, line_chart, bar_chart, table, pie_chart
    title: str
    data_source: str  # shopify, stripe, square, quickbooks
    metric: str
    dimension: Optional[str] = None
    filters: Optional[Dict[str, Any]] = None


class UpdateDashboardRequest(BaseModel):
    action: str  # add, update, remove
    widget: WidgetConfig


class DashboardUpdateResponse(BaseModel):
    success: bool
    message: str
    widget_config: Optional[Dict[str, Any]] = None


@router.post("/update")
async def update_dashboard(
    request: UpdateDashboardRequest,
    tenant_id: str = Depends(get_current_tenant_id),
    user_id: int = Depends(get_current_user_id)
):
    """
    Update dashboard using AI tool use pattern.
    The AI processes natural language requests and returns structured widget configs.
    """
    
    # Validate widget type
    valid_widget_types = ["kpi_card", "line_chart", "bar_chart", "table", "pie_chart"]
    if request.widget.widget_type not in valid_widget_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid widget_type. Must be one of: {', '.join(valid_widget_types)}"
        )
    
    # Validate data source
    valid_data_sources = ["shopify", "stripe", "square", "quickbooks"]
    if request.widget.data_source not in valid_data_sources:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid data_source. Must be one of: {', '.join(valid_data_sources)}"
        )
    
    # In a real implementation, this would:
    # 1. Call Claude with tool use to process the request
    # 2. Store the widget config in the database
    # 3. Return the updated dashboard layout
    
    # For now, return a mock response
    widget_config = {
        "widget_id": request.widget.widget_id or f"widget_{user_id}_{hash(request.widget.title)}",
        "widget_type": request.widget.widget_type,
        "title": request.widget.title,
        "data_source": request.widget.data_source,
        "metric": request.widget.metric,
        "dimension": request.widget.dimension,
        "filters": request.widget.filters,
        "tenant_id": tenant_id,
        "user_id": user_id
    }
    
    action_messages = {
        "add": f"Added {request.widget.title} to your dashboard",
        "update": f"Updated {request.widget.title} on your dashboard",
        "remove": f"Removed {request.widget.title} from your dashboard"
    }
    
    return DashboardUpdateResponse(
        success=True,
        message=action_messages.get(request.action, "Dashboard updated"),
        widget_config=widget_config
    )


@router.get("/widgets")
async def get_widgets(tenant_id: str = Depends(get_current_tenant_id)):
    """
    Get all widgets for the current tenant's dashboard.
    """
    # In a real implementation, this would query the database
    # For now, return mock data
    return {
        "widgets": [
            {
                "widget_id": "widget_1",
                "widget_type": "kpi_card",
                "title": "Revenue",
                "data_source": "shopify",
                "metric": "revenue",
                "value": "$85,420",
                "trend": {"value": "12%", "positive": True}
            },
            {
                "widget_id": "widget_2",
                "widget_type": "line_chart",
                "title": "Sales Overview",
                "data_source": "shopify",
                "metric": "revenue",
                "dimension": "week",
                "data": [
                    {"label": "Week 1", "value": 12000},
                    {"label": "Week 2", "value": 15000},
                    {"label": "Week 3", "value": 13000},
                    {"label": "Week 4", "value": 18000}
                ]
            }
        ]
    }


@router.post("/suggest-prompts")
async def suggest_prompts(
    connected_sources: List[str],
    existing_widgets: List[str] = []
):
    """
    Suggest relevant dashboard-building prompts based on connected sources.
    This could be enhanced to use AI for dynamic suggestions.
    """
    
    prompt_suggestions = {
        "shopify": [
            "Show me revenue by week",
            "Add a chart for top-selling products",
            "Track my refund rate over time"
        ],
        "stripe": [
            "Show me monthly recurring revenue",
            "Break down payments by customer type",
            "Add a chart for failed payment rate"
        ],
        "square": [
            "Show sales by location",
            "Compare weekday vs weekend revenue",
            "Add average order value trend"
        ],
        "quickbooks": [
            "Show profit by month",
            "Break down expenses by category",
            "Track accounts receivable over time"
        ]
    }
    
    # Get prompts for connected sources
    suggestions = []
    for source in connected_sources:
        if source in prompt_suggestions:
            suggestions.extend(prompt_suggestions[source])
    
    # If multiple sources, add multi-source prompts
    if len(connected_sources) > 1:
        suggestions.extend([
            "Combine my revenue from all sources into one view",
            "Which channel drives the most orders?"
        ])
    
    # Remove duplicates and limit to 6 suggestions
    unique_suggestions = list(dict.fromkeys(suggestions))[:6]
    
    return {
        "suggestions": unique_suggestions
    }
