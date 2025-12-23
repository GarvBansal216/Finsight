"""
Simple script to run the FastAPI server
"""
import uvicorn
import os
import sys
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Force stdout to be unbuffered so print statements show immediately
sys.stdout.reconfigure(line_buffering=True)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"\n{'='*60}")
    print(f"Starting FinSight Backend Server")
    print(f"Host: {host}")
    print(f"Port: {port}")
    print(f"{'='*60}\n")
    uvicorn.run(
        "app:app", 
        host=host, 
        port=port, 
        reload=True,
        log_level="info",
        access_log=True
    )


