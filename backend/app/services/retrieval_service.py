from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import PGVector
from app.core.config import settings


class RetrievalService:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
        self.vectorstore = PGVector(
            connection_string=settings.DATABASE_URL,
            embedding_function=self.embeddings,
            collection_name="schema_metadata"
        )

    async def retrieve_schema(self, question: str) -> str:
        # Embed the question
        question_embedding = self.embeddings.embed_query(question)
        
        # Search for similar schema metadata
        results = self.vectorstore.similarity_search_with_score(
            question,
            k=5
        )
        
        # Format results as context
        context_parts = []
        for doc, score in results:
            context_parts.append(f"{doc.page_content} (similarity: {score:.2f})")
        
        return "\n\n".join(context_parts)
