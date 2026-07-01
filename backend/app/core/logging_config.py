import logging
import sys
from datetime import datetime
from pathlib import Path

# Create logs directory
log_dir = Path("logs")
log_dir.mkdir(exist_ok=True)

# Configure logging
def setup_logging():
    """Configure application logging"""
    # Create formatters
    detailed_formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s - [%(filename)s:%(lineno)d]'
    )
    simple_formatter = logging.Formatter(
        '%(asctime)s - %(levelname)s - %(message)s'
    )
    
    # File handler for all logs
    file_handler = logging.FileHandler(
        log_dir / f"app_{datetime.now().strftime('%Y%m%d')}.log"
    )
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(detailed_formatter)
    
    # Console handler for errors
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(simple_formatter)
    
    # Error file handler
    error_handler = logging.FileHandler(
        log_dir / f"errors_{datetime.now().strftime('%Y%m%d')}.log"
    )
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(detailed_formatter)
    
    # Root logger configuration
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.DEBUG)
    root_logger.addHandler(file_handler)
    root_logger.addHandler(console_handler)
    root_logger.addHandler(error_handler)
    
    return root_logger


# Setup logging on import
logger = setup_logging()
