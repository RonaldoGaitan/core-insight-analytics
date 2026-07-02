from cryptography.fernet import Fernet
from app.core.config import settings
import base64
import logging

logger = logging.getLogger(__name__)


class EncryptionService:
    """Service for encrypting and decrypting sensitive data"""
    
    def __init__(self):
        self._fernet = None
        self._init_encryption()
    
    def _init_encryption(self):
        """Initialize encryption with a secure key"""
        # Generate or load encryption key
        encryption_key = getattr(settings, 'ENCRYPTION_KEY', None)
        
        if not encryption_key:
            # Generate a new key for development (in production, this should be set via env var)
            encryption_key = Fernet.generate_key()
            logger.warning("Using auto-generated encryption key. Set ENCRYPTION_KEY in production!")
        
        # Ensure key is in correct format
        if isinstance(encryption_key, str):
            encryption_key = encryption_key.encode()
        
        try:
            self._fernet = Fernet(encryption_key)
        except Exception as e:
            logger.error(f"Failed to initialize encryption: {str(e)}")
            # Fallback to generating a new key
            self._fernet = Fernet(Fernet.generate_key())
    
    def encrypt(self, data: str) -> str:
        """Encrypt a string and return base64-encoded result"""
        if not data:
            return ""
        
        try:
            if isinstance(data, str):
                data = data.encode()
            
            encrypted = self._fernet.encrypt(data)
            return base64.urlsafe_b64encode(encrypted).decode()
        except Exception as e:
            logger.error(f"Encryption failed: {str(e)}")
            raise
    
    def decrypt(self, encrypted_data: str) -> str:
        """Decrypt base64-encoded encrypted data"""
        if not encrypted_data:
            return ""
        
        try:
            encrypted_bytes = base64.urlsafe_b64decode(encrypted_data.encode())
            decrypted = self._fernet.decrypt(encrypted_bytes)
            return decrypted.decode()
        except Exception as e:
            logger.error(f"Decryption failed: {str(e)}")
            raise
    
    def encrypt_dict(self, data: dict) -> str:
        """Encrypt a dictionary by converting to JSON first"""
        import json
        json_str = json.dumps(data)
        return self.encrypt(json_str)
    
    def decrypt_dict(self, encrypted_data: str) -> dict:
        """Decrypt to dictionary"""
        import json
        json_str = self.decrypt(encrypted_data)
        return json.loads(json_str)


# Global encryption service instance
encryption_service = EncryptionService()
