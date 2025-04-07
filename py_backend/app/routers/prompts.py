from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from starlette.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST

from app.models.prompt import PromptCreate, PromptResponse, PromptUpdate, SearchQuery
from app.services.prompt_service import PromptService

router = APIRouter()

# Dependency to get the prompt service
def get_prompt_service():
    return PromptService()

@router.get("/", response_model=List[PromptResponse])
async def get_all_prompts(
    teams: Optional[str] = Query(None, description="Comma-separated list of team names"),
    prompt_service: PromptService = Depends(get_prompt_service)
):
    """
    Get all prompts, optionally filtered by team names
    """
    teams_list = teams.split(",") if teams else None
    prompts = await prompt_service.get_all_prompts(teams_list)
    return prompts

@router.get("/models", response_model=List[str])
async def get_all_models(
    prompt_service: PromptService = Depends(get_prompt_service)
):
    """
    Get all unique model names
    """
    return await prompt_service.get_all_models()

@router.get("/teams", response_model=List[str])
async def get_all_teams(
    prompt_service: PromptService = Depends(get_prompt_service)
):
    """
    Get all unique team names
    """
    return await prompt_service.get_all_teams()

@router.post("/search", response_model=List[PromptResponse])
async def search_prompts(
    search_query: SearchQuery,
    prompt_service: PromptService = Depends(get_prompt_service)
):
    """
    Search prompts by query string, optionally filtered by team names
    """
    return await prompt_service.search_prompts(search_query.query, search_query.teams)

@router.get("/team/{team_name}", response_model=List[PromptResponse])
async def get_prompts_by_team(
    team_name: str,
    prompt_service: PromptService = Depends(get_prompt_service)
):
    """
    Get all prompts for a specific team
    """
    prompts = await prompt_service.get_prompts_by_team(team_name)
    return prompts

@router.get("/{id}", response_model=Optional[PromptResponse])
async def get_prompt_by_id(
    id: int,
    prompt_service: PromptService = Depends(get_prompt_service)
):
    """
    Get a prompt by ID
    """
    prompt = await prompt_service.get_prompt_by_id(id)
    if prompt is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Prompt not found")
    return prompt

@router.post("/", response_model=PromptResponse, status_code=201)
async def create_prompt(
    prompt: PromptCreate,
    prompt_service: PromptService = Depends(get_prompt_service)
):
    """
    Create a new prompt
    """
    return await prompt_service.create_prompt(prompt)

@router.put("/{id}", response_model=PromptResponse)
async def update_prompt(
    id: int,
    prompt_update: PromptUpdate,
    prompt_service: PromptService = Depends(get_prompt_service)
):
    """
    Update an existing prompt
    """
    updated_prompt = await prompt_service.update_prompt(id, prompt_update)
    if updated_prompt is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Prompt not found")
    return updated_prompt

@router.delete("/{id}", response_model=dict)
async def delete_prompt(
    id: int,
    prompt_service: PromptService = Depends(get_prompt_service)
):
    """
    Delete a prompt
    """
    deleted = await prompt_service.delete_prompt(id)
    if not deleted:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Prompt not found")
    return {"message": "Prompt deleted successfully"}
