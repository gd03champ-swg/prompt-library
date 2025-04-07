from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.config import PORT, APP_NAME
from app.routers import prompts
from app.db.dynamodb import create_prompts_table

app = FastAPI(
    title=APP_NAME,
    description="Backend API for Prompt Library",
    version="0.1.0",
    #redirect_slashes=False
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(prompts.router, prefix="/api/prompts", tags=["prompts"])

@app.on_event("startup")
async def startup_event():
    """
    Run startup tasks:
    - Ensure DynamoDB table exists
    """
    create_prompts_table()

@app.get("/", tags=["root"])
async def root():
    """
    Root endpoint - health check
    """
    return {"message": "Welcome to Prompt Library API"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=PORT, reload=True)
