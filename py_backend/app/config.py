import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# FastAPI application settings
PORT = int(os.getenv('PORT', 3001))
APP_NAME = 'Prompt Library API'

# MongoDB connection (for data migration)
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/prompt_library')

# DynamoDB settings
AWS_REGION = os.getenv('AWS_REGION', 'us-east-1')
# These will be available from terminal environment
# AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
DYNAMODB_TABLE_NAME = os.getenv('DYNAMODB_TABLE_NAME', 'prompts')
