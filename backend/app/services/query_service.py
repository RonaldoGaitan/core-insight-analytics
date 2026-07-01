from app.services.retrieval_service import RetrievalService
from app.services.sql_generator import SQLGenerator
from app.services.sql_executor import SQLExecutor
from app.services.visualization_service import VisualizationService


class QueryService:
    def __init__(self):
        self.retrieval_service = RetrievalService()
        self.sql_generator = SQLGenerator()
        self.sql_executor = SQLExecutor()
        self.visualization_service = VisualizationService()

    async def process_question(self, question: str) -> dict:
        # Step 1: Retrieve relevant schema context
        schema_context = await self.retrieval_service.retrieve_schema(question)
        
        # Step 2: Generate SQL using AI
        sql = await self.sql_generator.generate_sql(question, schema_context)
        
        # Step 3: Execute SQL
        data = await self.sql_executor.execute_sql(sql)
        
        # Step 4: Generate visualization
        visualization = await self.visualization_service.generate_visualization(data, question)
        
        return {
            "sql": sql,
            "data": data,
            "visualization": visualization,
            "explanation": f"Generated SQL to answer: {question}"
        }
