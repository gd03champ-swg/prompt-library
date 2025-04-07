#!/usr/bin/env python3
"""
Entry point to run the FastAPI server
"""
import uvicorn
from app.config import PORT

if __name__ == "__main__":
    print(f"Starting Prompt Library API server on port {PORT}...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=PORT, reload=True)
