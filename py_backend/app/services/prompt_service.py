from datetime import datetime
from typing import List, Optional, Dict, Any
import time
import re
from boto3.dynamodb.conditions import Key, Attr

from app.db.dynamodb import get_table
from app.models.prompt import PromptCreate, PromptUpdate

class PromptService:
    """
    Service for handling prompt operations with DynamoDB
    """
    
    def __init__(self):
        self.table = get_table()
    
    async def get_all_prompts(self, teams: Optional[List[str]] = None) -> List[Dict]:
        """
        Get all prompts, optionally filtered by team names
        """
        if teams:
            # Filter by teams
            response = self.table.scan(
                FilterExpression=Attr('teamName').is_in(teams)
            )
        else:
            # Get all prompts
            response = self.table.scan()
        
        return sorted(response.get('Items', []), key=lambda x: x.get('id', 0))
    
    async def get_prompt_by_id(self, id: int) -> Optional[Dict]:
        """
        Get a prompt by ID
        """
        response = self.table.get_item(Key={'id': id})
        return response.get('Item')
    
    async def get_prompts_by_team(self, team_name: str) -> List[Dict]:
        """
        Get all prompts for a specific team
        """
        response = self.table.query(
            IndexName='teamName-index',
            KeyConditionExpression=Key('teamName').eq(team_name)
        )
        return response.get('Items', [])
    
    async def create_prompt(self, prompt: PromptCreate) -> Dict:
        """
        Create a new prompt
        """
        # Get highest ID
        response = self.table.scan(
            ProjectionExpression="id",
            Select='SPECIFIC_ATTRIBUTES'
        )
        items = response.get('Items', [])
        new_id = 1
        if items:
            new_id = max([item.get('id', 0) for item in items]) + 1
        
        # Current timestamp as ISO string
        timestamp = datetime.now().isoformat()
        
        # Create item
        item = {
            'id': new_id,
            'teamName': prompt.teamName,
            'useCase': prompt.useCase,
            'prompt': prompt.prompt,
            'examplePrompt': prompt.examplePrompt,
            'model': prompt.model,
            'createdAt': timestamp,
            'updatedAt': timestamp
        }
        
        # Add optional fields if present
        if prompt.howToUse:
            item['howToUse'] = prompt.howToUse
            
        # Put item in DynamoDB
        self.table.put_item(Item=item)
        return item
    
    async def update_prompt(self, id: int, prompt_update: PromptUpdate) -> Optional[Dict]:
        """
        Update an existing prompt
        """
        # Get existing prompt
        existing = await self.get_prompt_by_id(id)
        if not existing:
            return None
        
        # Update timestamp
        timestamp = datetime.now().isoformat()
        
        # Build update expression
        update_expressions = []
        expression_values = {':updatedAt': timestamp}
        
        # Add fields to update if they're present
        if prompt_update.teamName is not None:
            update_expressions.append('teamName = :teamName')
            expression_values[':teamName'] = prompt_update.teamName
            
        if prompt_update.useCase is not None:
            update_expressions.append('useCase = :useCase')
            expression_values[':useCase'] = prompt_update.useCase
            
        if prompt_update.prompt is not None:
            update_expressions.append('prompt = :prompt')
            expression_values[':prompt'] = prompt_update.prompt
            
        if prompt_update.examplePrompt is not None:
            update_expressions.append('examplePrompt = :examplePrompt')
            expression_values[':examplePrompt'] = prompt_update.examplePrompt
            
        if prompt_update.howToUse is not None:
            update_expressions.append('howToUse = :howToUse')
            expression_values[':howToUse'] = prompt_update.howToUse
            
        if prompt_update.model is not None:
            update_expressions.append('model = :model')
            expression_values[':model'] = prompt_update.model
            
        # Always update the updatedAt field
        update_expressions.append('updatedAt = :updatedAt')
        
        # Update the item in DynamoDB
        if update_expressions:
            update_expression = 'SET ' + ', '.join(update_expressions)
            
            response = self.table.update_item(
                Key={'id': id},
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_values,
                ReturnValues='ALL_NEW'
            )
            return response.get('Attributes')
        
        return existing
    
    async def delete_prompt(self, id: int) -> bool:
        """
        Delete a prompt
        """
        # Check if prompt exists
        existing = await self.get_prompt_by_id(id)
        if not existing:
            return False
        
        # Delete the prompt
        self.table.delete_item(Key={'id': id})
        return True
    
    async def get_all_teams(self) -> List[str]:
        """
        Get all unique team names
        """
        response = self.table.scan(
            ProjectionExpression="teamName",
            Select='SPECIFIC_ATTRIBUTES'
        )
        teams = {item.get('teamName') for item in response.get('Items', [])}
        return sorted(list(teams))
    
    async def get_all_models(self) -> List[str]:
        """
        Get all unique model names
        """
        response = self.table.scan(
            ProjectionExpression="model",
            Select='SPECIFIC_ATTRIBUTES'
        )
        models = {item.get('model', 'claude-sonnet-3.5') for item in response.get('Items', [])}
        models = [model for model in models if model]  # Filter out None/empty values
        return sorted(list(models))
    
    async def search_prompts(self, query: str, teams: Optional[List[str]] = None) -> List[Dict]:
        """
        Search prompts by query string
        """
        if not query.strip():
            return []
        
        # Create a case-insensitive regex pattern for the query
        pattern = re.compile(query, re.IGNORECASE)
        
        # Get all prompts (filtered by team if specified)
        prompts = await self.get_all_prompts(teams)
        
        # Filter prompts that match the query
        matches = []
        for prompt in prompts:
            search_text = f"{prompt.get('useCase', '')} {prompt.get('prompt', '')} {prompt.get('teamName', '')} {prompt.get('examplePrompt', '')}"
            
            if pattern.search(search_text):
                matches.append(prompt)
        
        return matches
