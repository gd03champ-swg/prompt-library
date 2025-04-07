#!/usr/bin/env python3
"""
Script to migrate prompt data from MongoDB to DynamoDB
"""
import asyncio
import os
import sys
from pymongo import MongoClient
from datetime import datetime
import boto3
from botocore.exceptions import ClientError
import json

# Add parent directory to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.config import MONGODB_URI, AWS_REGION, DYNAMODB_TABLE_NAME

async def migrate_data():
    """
    Migrate data from MongoDB to DynamoDB
    """
    print("Starting migration from MongoDB to DynamoDB...")
    
    # MongoDB connection
    try:
        mongo_client = MongoClient(MONGODB_URI)
        mongo_db = mongo_client.get_database()
        prompts_collection = mongo_db.prompts
        print(f"Connected to MongoDB: {MONGODB_URI}")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return
    
    # DynamoDB connection
    try:
        dynamodb = boto3.resource(
            'dynamodb',
            region_name=AWS_REGION
        )
        print(f"Connected to DynamoDB in region: {AWS_REGION}")
        
        try:
            prompts_table = dynamodb.Table(DYNAMODB_TABLE_NAME)
            # Check if table exists by querying its metadata
            prompts_table.table_status
            print(f"Found DynamoDB table: {DYNAMODB_TABLE_NAME}")
        except Exception as e:
            print(f"DynamoDB table {DYNAMODB_TABLE_NAME} does not exist or could not be accessed: {e}")
            print("Please make sure the table is created before running this script.")
            return
    except Exception as e:
        print(f"Error connecting to DynamoDB: {e}")
        return
    
    # Fetch all prompts from MongoDB
    try:
        prompts = list(prompts_collection.find({}))
        print(f"Found {len(prompts)} prompts in MongoDB")
    except Exception as e:
        print(f"Error fetching prompts from MongoDB: {e}")
        return
    
    # Migrate each prompt
    migrated_count = 0
    error_count = 0
    
    for prompt in prompts:
        # Convert MongoDB's ObjectId to string
        prompt['_id'] = str(prompt['_id'])
        
        # Handle empty or missing model field
        if 'model' not in prompt or not prompt['model']:
            prompt['model'] = 'claude-sonnet-3.5'
        
        # Prepare DynamoDB item
        item = {
            'id': prompt['id'],
            'teamName': prompt['teamName'],
            'useCase': prompt['useCase'],
            'prompt': prompt['prompt'],
            'examplePrompt': prompt['examplePrompt'],
            'model': prompt['model']
        }
        
        # Add optional fields if present
        if 'howToUse' in prompt and prompt['howToUse']:
            item['howToUse'] = prompt['howToUse']
        
        # Handle timestamps
        timestamp = datetime.now().isoformat()
        if 'createdAt' in prompt and prompt['createdAt']:
            try:
                # Try to convert MongoDB date to ISO string
                item['createdAt'] = prompt['createdAt'].isoformat()
            except:
                # If that fails, use current time
                item['createdAt'] = timestamp
        else:
            item['createdAt'] = timestamp
        
        if 'updatedAt' in prompt and prompt['updatedAt']:
            try:
                item['updatedAt'] = prompt['updatedAt'].isoformat()
            except:
                item['updatedAt'] = timestamp
        else:
            item['updatedAt'] = timestamp
        
        # Write to DynamoDB
        try:
            prompts_table.put_item(Item=item)
            print(f"Migrated prompt ID: {prompt['id']} - '{prompt['useCase']}'")
            migrated_count += 1
        except ClientError as e:
            print(f"Error migrating prompt ID: {prompt['id']}: {e}")
            error_count += 1
    
    print(f"Migration completed. {migrated_count} prompts migrated successfully, {error_count} errors.")

if __name__ == "__main__":
    asyncio.run(migrate_data())
