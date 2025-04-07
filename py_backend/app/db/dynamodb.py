import boto3
from boto3.dynamodb.conditions import Key, Attr
import os
from app.config import AWS_REGION, DYNAMODB_TABLE_NAME

def get_dynamodb_resource():
    """
    Get a boto3 DynamoDB resource
    """
    return boto3.resource(
        'dynamodb',
        region_name=AWS_REGION
    )

def get_table():
    """
    Get a reference to the DynamoDB table
    """
    dynamodb = get_dynamodb_resource()
    table = dynamodb.Table(DYNAMODB_TABLE_NAME)
    return table

def create_prompts_table(dynamodb=None):
    """
    Create the prompts table if it doesn't exist
    """
    if dynamodb is None:
        dynamodb = get_dynamodb_resource()

    # Check if table exists
    try:
        table = dynamodb.Table(DYNAMODB_TABLE_NAME)
        table.load()
        print(f"Table '{DYNAMODB_TABLE_NAME}' already exists")
        return table
    except dynamodb.meta.client.exceptions.ResourceNotFoundException:
        print(f"Table '{DYNAMODB_TABLE_NAME}' does not exist, creating...")
        
        table = dynamodb.create_table(
            TableName=DYNAMODB_TABLE_NAME,
            KeySchema=[
                {'AttributeName': 'id', 'KeyType': 'HASH'},  # Partition key
            ],
            AttributeDefinitions=[
                {'AttributeName': 'id', 'AttributeType': 'N'},
                {'AttributeName': 'teamName', 'AttributeType': 'S'},
            ],
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'teamName-index',
                    'KeySchema': [
                        {'AttributeName': 'teamName', 'KeyType': 'HASH'},
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    },
                    'ProvisionedThroughput': {
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                    }
                },
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        
        # Wait for the table to be created
        table.meta.client.get_waiter('table_exists').wait(TableName=DYNAMODB_TABLE_NAME)
        print(f"Created table '{DYNAMODB_TABLE_NAME}'")
        return table
