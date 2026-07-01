from sqlalchemy import text, inspect
from app.core.database import get_db
from typing import Dict, Any, List


class ColumnProfiler:
    """Analyzes individual columns to extract metadata"""
    
    def __init__(self):
        self.semantic_types = {
            'id': ['id', 'uuid', 'key'],
            'date': ['date', 'time', 'at', 'on'],
            'money': ['amount', 'price', 'cost', 'revenue', 'sales', 'total'],
            'quantity': ['count', 'quantity', 'number', 'num'],
            'email': ['email'],
            'category': ['type', 'status', 'category', 'class'],
            'text': ['name', 'description', 'title'],
            'boolean': ['is_', 'has_', 'active', 'enabled']
        }
    
    def profile_column(self, table_name: str, column_name: str) -> Dict[str, Any]:
        """Profile a single column and return metadata"""
        db = next(get_db())
        try:
            inspector = inspect(db.bind)
            columns = inspector.get_columns(table_name)
            
            column_info = next((c for c in columns if c['name'] == column_name), None)
            if not column_info:
                return {}
            
            # Get basic statistics
            stats_query = text(f"""
                SELECT
                    COUNT(*) as total_count,
                    COUNT(DISTINCT "{column_name}") as distinct_count,
                    COUNT("{column_name}") as non_null_count,
                    MIN("{column_name}") as min_value,
                    MAX("{column_name}") as max_value
                FROM "{table_name}"
            """)
            
            result = db.execute(stats_query).fetchone()
            
            # Detect semantic type
            semantic_type = self._detect_semantic_type(column_name, column_info['type'])
            
            # Get sample values for categorical columns
            sample_values = []
            if semantic_type in ['category', 'text']:
                sample_query = text(f"""
                    SELECT DISTINCT "{column_name}"
                    FROM "{table_name}"
                    LIMIT 5
                """)
                samples = db.execute(sample_query).fetchall()
                sample_values = [str(s[0]) for s in samples if s[0]]
            
            return {
                'column_name': column_name,
                'data_type': str(column_info['type']),
                'total_count': result.total_count,
                'distinct_count': result.distinct_count,
                'null_ratio': 1 - (result.non_null_count / result.total_count) if result.total_count > 0 else 0,
                'min_value': str(result.min_value) if result.min_value else None,
                'max_value': str(result.max_value) if result.max_value else None,
                'semantic_type': semantic_type,
                'sample_values': sample_values
            }
        finally:
            db.close()
    
    def _detect_semantic_type(self, column_name: str, column_type) -> str:
        """Detect semantic type based on column name and data type"""
        column_lower = column_name.lower()
        type_str = str(column_type).lower()
        
        # Check by name patterns
        for semantic_type, patterns in self.semantic_types.items():
            for pattern in patterns:
                if pattern in column_lower:
                    return semantic_type
        
        # Check by data type
        if 'int' in type_str or 'bigint' in type_str:
            return 'quantity'
        elif 'varchar' in type_str or 'text' in type_str:
            return 'text'
        elif 'timestamp' in type_str or 'date' in type_str:
            return 'date'
        elif 'decimal' in type_str or 'numeric' in type_str:
            return 'money'
        elif 'bool' in type_str:
            return 'boolean'
        
        return 'text'
