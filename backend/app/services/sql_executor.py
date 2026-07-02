from sqlalchemy import text
from app.core.database import get_db
from app.core.tenant_context import set_tenant_context


class SQLExecutor:
    async def execute_sql(self, sql: str, tenant_id: str = None) -> list:
        if tenant_id:
            # Use tenant context for proper isolation
            with set_tenant_context(tenant_id) as db:
                return self._execute_query(db, sql)
        else:
            # Fallback without tenant isolation (for backwards compatibility)
            db = next(get_db())
            try:
                return self._execute_query(db, sql)
            finally:
                db.close()
    
    def _execute_query(self, db, sql: str) -> list:
        """Internal method to execute SQL query"""
        # Execute the SQL query
        result = db.execute(text(sql))
        
        # Convert to list of dicts
        columns = result.keys()
        data = []
        for row in result:
            data.append(dict(zip(columns, row)))
        
        return data
