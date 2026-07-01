from anthropic import Anthropic
from app.core.config import settings
from typing import List


class EmbeddingService:
    """Service for generating text embeddings using Claude"""
    
    def __init__(self):
        self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    
    async def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for text using Claude (placeholder - Claude doesn't have embeddings yet)"""
        # Note: Claude doesn't have embeddings API yet, so we'll use a simple hash-based approach
        # In production, you'd want to use OpenAI embeddings or another embedding service
        import hashlib
        import numpy as np
        
        # Create a simple hash-based embedding
        hash_obj = hashlib.sha256(text.encode())
        hash_bytes = hash_obj.digest()
        
        # Convert to 1536-dimensional vector (matching OpenAI's size)
        embedding = np.zeros(1536)
        for i, byte in enumerate(hash_bytes):
            embedding[i % 1536] = byte / 255.0
        
        return embedding.tolist()
