# Temporarily disabled - embeddings integration to be fixed later
# from langchain_anthropic import AnthropicEmbeddings
# from langchain_community.vectorstores import PGVector
from app.core.config import settings


class RetrievalService:
    def __init__(self):
        # Temporarily disabled - embeddings integration to be fixed later
        # self.embeddings = AnthropicEmbeddings(anthropic_api_key=settings.ANTHROPIC_API_KEY)
        # self.vectorstore = PGVector(
        #     connection_string=settings.DATABASE_URL,
        #     embedding_function=self.embeddings,
        #     collection_name="schema_metadata"
        # )
        pass

    async def retrieve_schema(self, question: str, tenant_id: str = None) -> str:
        # Temporarily return empty context - embeddings integration to be fixed later
        # In production, this would use tenant_id to filter schema metadata
        return "Embeddings service temporarily disabled for deployment"
