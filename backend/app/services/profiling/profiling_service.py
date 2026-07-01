from app.services.profiling.table_profiler import TableProfiler
from app.services.embedding_service import EmbeddingService
from typing import List


class ProfilingService:
    """Main service for profiling data and storing metadata"""
    
    def __init__(self):
        self.table_profiler = TableProfiler()
        self.embedding_service = EmbeddingService()
    
    async def profile_database(self, table_names: List[str], tenant_id: str):
        """Profile multiple tables and store metadata with embeddings"""
        for table_name in table_names:
            # Profile the table
            profile = self.table_profiler.profile_table(table_name)
            
            # Store column metadata with embeddings
            for column in profile['columns']:
                description = self._generate_column_description(table_name, column)
                embedding = await self.embedding_service.generate_embedding(description)
                
                # Store in schema_metadata table
                await self._store_schema_metadata(
                    tenant_id=tenant_id,
                    table_name=table_name,
                    column_name=column['column_name'],
                    description=description,
                    semantic_type=column['semantic_type'],
                    embedding=embedding
                )
    
    def _generate_column_description(self, table_name: str, column: dict) -> str:
        """Generate a natural language description of a column"""
        return f"Table {table_name} has column {column['column_name']} of type {column['data_type']}. " \
               f"Semantic type: {column['semantic_type']}. " \
               f"Contains {column['distinct_count']} distinct values. " \
               f"Sample values: {', '.join(column.get('sample_values', [])[:3])}"
    
    async def _store_schema_metadata(self, tenant_id: str, table_name: str, column_name: str, 
                                       description: str, semantic_type: str, embedding: List[float]):
        """Store schema metadata in the database"""
        from sqlalchemy import text
        from app.core.database import get_db
        
        db = next(get_db())
        try:
            query = text("""
                INSERT INTO schema_metadata (tenant_id, table_name, column_name, description, semantic_type, embedding)
                VALUES (:tenant_id, :table_name, :column_name, :description, :semantic_type, :embedding::vector)
                ON CONFLICT (tenant_id, table_name, column_name) 
                DO UPDATE SET description = EXCLUDED.description, 
                              semantic_type = EXCLUDED.semantic_type,
                              embedding = EXCLUDED.embedding,
                              updated_at = NOW()
            """)
            
            db.execute(query, {
                'tenant_id': tenant_id,
                'table_name': table_name,
                'column_name': column_name,
                'description': description,
                'semantic_type': semantic_type,
                'embedding': str(embedding)
            })
            db.commit()
        finally:
            db.close()
