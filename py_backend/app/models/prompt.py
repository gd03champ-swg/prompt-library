from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field

class PromptBase(BaseModel):
    """Base model for Prompt with common attributes"""
    teamName: str
    useCase: str
    prompt: str
    examplePrompt: str
    howToUse: Optional[str] = None
    model: str = "claude-sonnet-3.5"

class PromptCreate(PromptBase):
    """Model for creating a new prompt"""
    pass

class PromptUpdate(BaseModel):
    """Model for updating an existing prompt"""
    teamName: Optional[str] = None
    useCase: Optional[str] = None
    prompt: Optional[str] = None
    examplePrompt: Optional[str] = None
    howToUse: Optional[str] = None
    model: Optional[str] = None

class PromptResponse(PromptBase):
    """Model for prompt returned from API"""
    id: int
    createdAt: str
    updatedAt: str

    class Config:
        """Pydantic configuration"""
        schema_extra = {
            "example": {
                "id": 1,
                "teamName": "Generic",
                "useCase": "Learn something new today in 2 mins",
                "prompt": "For the below keyword teach me 80% of it by identifying the most important 20%. Ensure the read time is around 2 mins.",
                "examplePrompt": "Keyword: \"Quantum Computing\"",
                "howToUse": "Attach a related article or use voice input to speak the keyword aloud.",
                "model": "claude-sonnet-3.5",
                "createdAt": "2023-06-01T12:00:00Z",
                "updatedAt": "2023-06-01T12:00:00Z"
            }
        }

class SearchQuery(BaseModel):
    """Model for search request"""
    query: str
    teams: List[str] = []
