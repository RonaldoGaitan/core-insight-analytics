from sqlalchemy import inspect
from app.core.database import get_db
from app.services.profiling.column_profiler import ColumnProfiler
from typing import Dict, Any, List


class TableProfiler:
    """Analyzes entire tables and detects relationships"""
    
    def __init__(self):
        self.column_profiler = ColumnProfiler()
    
    def profile_table(self, table_name: str) -> Dict[str, Any]:
        """Profile an entire table and return metadata"""
        db = next(get_db())
        try:
            inspector = inspect(db.bind)
            
            # Get table info
            columns = inspector.get_columns(table_name)
            
            # Profile each column
            column_profiles = []
            for col in columns:
                profile = self.column_profiler.profile_column(table_name, col['name'])
                column_profiles.append(profile)
            
            # Detect potential relationships
            relationships = self._detect_relationships(table_name, column_profiles)
            
            return {
                'table_name': table_name,
                'columns': column_profiles,
                'relationships': relationships,
                'row_count': self._get_row_count(table_name)
            }
        finally:
            db.close()
    
    def _detect_relationships(self, table_name: str, column_profiles: List[Dict]) -> List[Dict]:
        """Detect potential foreign key relationships based on column patterns"""
        relationships = []
        
        for col in column_profiles:
            col_name = col['column_name']
            semantic_type = col['semantic_type']
            
            # ID columns are potential foreign keys
            if semantic_type == 'id' and not col_name.endswith('_id'):
                # This might be a primary key
                relationships.append({
                    'type': 'primary_key',
                    'column': col_name,
                    'references': f"{table_name}.{col_name}"
                })
            elif col_name.endswith('_id'):
                # This might be a foreign key
                referenced_table = col_name.replace('_id', '')
                relationships.append({
                    'type': 'foreign_key',
                    'column': col_name,
                    'references': f"{referenced_table}.id"
                })
        
        return relationships
    
    def _get_row_count(self, table_name: str) -> int:
        """Get the row count of a table"""
        from sqlalchemy import text
        db = next(get_db())
        try:
            result = db.execute(text(f'SELECT COUNT(*) FROM "{table_name}"')).scalar()
            return result
        finally:
            db.close()
