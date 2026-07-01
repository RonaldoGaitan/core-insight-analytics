from sqlalchemy import text
from app.core.database import get_db


class SQLExecutor:
    async def execute_sql(self, sql: str) -> list:
        db = next(get_db())
        try:
            # Execute the SQL query
            result = db.execute(text(sql))
            
            # Convert to list of dicts
            columns = result.keys()
            data = []
            for row in result:
                data.append(dict(zip(columns, row)))
            
            return data
        finally:
            db.close()
