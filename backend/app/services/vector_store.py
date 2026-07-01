from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import PGVector
from langchain_community.document_loaders import TextLoader
from app.core.config import settings
from typing import List, Optional


class VectorStore:
    """Manages pgvector operations for schema metadata"""
    
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
        self.collection_name = "schema_metadata"
    
    def get_vectorstore(self):
        """Get or create the PGVector store"""
        return PGVector(
            connection_string=settings.DATABASE_URL,
            embedding_function=self.embeddings,
            collection_name=self.collection_name
        )
    
    async def add_schema_metadata(self, documents: List[str], metadatas: List[dict]):
        """Add schema metadata documents to the vector store"""
        vectorstore = self.get_vectorstore()
        
        # Add documents with metadata
        vectorstore.add_texts(
            texts=documents,
            metadatas=metadatas
        )
    
    async def similarity_search(self, query: str, k: int = 5, tenant_id: Optional[str] = None):
        """Search for similar schema metadata"""
        vectorstore = self.get_vectorstore()
        
        if tenant_id:
            # Filter by tenant_id in metadata
            filter_dict = {"tenant_id": tenant_id}
            results = vectorstore.similarity_search_with_score(
                query=query,
                k=k,
                filter=filter_dict
            )
        else:
            results = vectorstore.similarity_search_with_score(
                query=query,
                k=k
            )
        
        return results
    
    async def delete_tenant_data(self, tenant_id: str):
        """Delete all data for a specific tenant"""
        vectorstore = self.get_vectorstore()
        
        # Get all documents for the tenant
        results = await self.similarity_search(
            query="dummy",
            k=1000,
            tenant_id=tenant_id
        )
        
        # Delete them
        for doc, score in results:
            vectorstore.delete([doc.metadata.get('id')])
