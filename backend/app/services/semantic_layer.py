from sqlalchemy import text
from app.core.database import get_db
from typing import Dict, Any, List, Optional


class SemanticLayer:
    """Manages business metrics and their definitions"""
    
    def __init__(self):
        pass
    
    def get_metric(self, tenant_id: str, metric_name: str) -> Optional[Dict[str, Any]]:
        """Get a metric definition by name"""
        db = next(get_db())
        try:
            query = text("""
                SELECT id, name, description, definition, filters, time_window
                FROM semantic_metrics
                WHERE tenant_id = :tenant_id AND name = :metric_name
            """)
            result = db.execute(query, {
                'tenant_id': tenant_id,
                'metric_name': metric_name
            }).fetchone()
            
            if result:
                return {
                    'id': result.id,
                    'name': result.name,
                    'description': result.description,
                    'definition': result.definition,
                    'filters': result.filters,
                    'time_window': result.time_window
                }
            return None
        finally:
            db.close()
    
    def list_metrics(self, tenant_id: str) -> List[Dict[str, Any]]:
        """List all metrics for a tenant"""
        db = next(get_db())
        try:
            query = text("""
                SELECT id, name, description, definition, filters, time_window
                FROM semantic_metrics
                WHERE tenant_id = :tenant_id
                ORDER BY name
            """)
            results = db.execute(query, {'tenant_id': tenant_id}).fetchall()
            
            return [{
                'id': r.id,
                'name': r.name,
                'description': r.description,
                'definition': r.definition,
                'filters': r.filters,
                'time_window': r.time_window
            } for r in results]
        finally:
            db.close()
    
    def create_metric(self, tenant_id: str, name: str, description: str, 
                     definition: str, filters: Optional[Dict] = None, 
                     time_window: Optional[str] = None) -> Dict[str, Any]:
        """Create a new metric"""
        db = next(get_db())
        try:
            query = text("""
                INSERT INTO semantic_metrics (tenant_id, name, description, definition, filters, time_window)
                VALUES (:tenant_id, :name, :description, :definition, :filters, :time_window)
                RETURNING id, name, description, definition, filters, time_window
            """)
            result = db.execute(query, {
                'tenant_id': tenant_id,
                'name': name,
                'description': description,
                'definition': definition,
                'filters': filters,
                'time_window': time_window
            }).fetchone()
            db.commit()
            
            return {
                'id': result.id,
                'name': result.name,
                'description': result.description,
                'definition': result.definition,
                'filters': result.filters,
                'time_window': result.time_window
            }
        finally:
            db.close()
    
    def update_metric(self, tenant_id: str, metric_name: str, **updates) -> Optional[Dict[str, Any]]:
        """Update an existing metric"""
        db = next(get_db())
        try:
            set_clauses = []
            params = {'tenant_id': tenant_id, 'metric_name': metric_name}
            
            for key, value in updates.items():
                if key in ['description', 'definition', 'filters', 'time_window']:
                    set_clauses.append(f"{key} = :{key}")
                    params[key] = value
            
            if not set_clauses:
                return self.get_metric(tenant_id, metric_name)
            
            query = text(f"""
                UPDATE semantic_metrics
                SET {', '.join(set_clauses)}, updated_at = NOW()
                WHERE tenant_id = :tenant_id AND name = :metric_name
                RETURNING id, name, description, definition, filters, time_window
            """)
            
            result = db.execute(query, params).fetchone()
            db.commit()
            
            if result:
                return {
                    'id': result.id,
                    'name': result.name,
                    'description': result.description,
                    'definition': result.definition,
                    'filters': result.filters,
                    'time_window': result.time_window
                }
            return None
        finally:
            db.close()
    
    def delete_metric(self, tenant_id: str, metric_name: str) -> bool:
        """Delete a metric"""
        db = next(get_db())
        try:
            query = text("""
                DELETE FROM semantic_metrics
                WHERE tenant_id = :tenant_id AND name = :metric_name
            """)
            result = db.execute(query, {
                'tenant_id': tenant_id,
                'metric_name': metric_name
            })
            db.commit()
            
            return result.rowcount > 0
        finally:
            db.close()
    
    def get_metric_context_for_ai(self, tenant_id: str) -> str:
        """Get all metrics formatted as context for AI"""
        metrics = self.list_metrics(tenant_id)
        
        context_parts = []
        for metric in metrics:
            context_parts.append(
                f"Metric: {metric['name']}\n"
                f"Description: {metric['description']}\n"
                f"Definition: {metric['definition']}\n"
                f"Filters: {metric['filters']}\n"
                f"Time Window: {metric['time_window']}\n"
            )
        
        return "\n\n".join(context_parts)
