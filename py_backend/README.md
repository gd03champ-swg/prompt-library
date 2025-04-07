# Prompt Library FastAPI Backend

This is the Python FastAPI backend for the Prompt Library application, which stores and manages prompt templates. The backend uses DynamoDB for data storage.

## Features

- CRUD operations for prompt templates
- Search functionality
- Team and model filtering
- REST API with automatic documentation
- Integration with AWS DynamoDB

## Prerequisites

- Python 3.8 or higher
- MongoDB (for data migration)
- AWS account with DynamoDB access
- AWS credentials in environment variables

## Installation

1. Clone the repository
2. Navigate to the `py_backend` directory
3. Install dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

Environment variables can be configured in the `.env` file:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/prompt_library
AWS_REGION=us-east-1
DYNAMODB_TABLE_NAME=prompts
```

AWS credentials should be available in the terminal environment or through the AWS CLI configuration.

## Database Setup

1. The DynamoDB table will be automatically created on application startup if it doesn't exist
2. To migrate data from MongoDB to DynamoDB, run:

```bash
python scripts/migrate_mongo_to_dynamo.py
```

## Running the Application

To start the development server:

```bash
python run.py
```

Or with uvicorn directly:

```bash
uvicorn app.main:app --reload --port 3001
```

The API will be available at `http://localhost:3001`

## API Documentation

FastAPI provides automatic API documentation:

- Swagger UI: `http://localhost:3001/docs`
- ReDoc: `http://localhost:3001/redoc`

## API Endpoints

- `GET /`: Welcome message
- `GET /api/prompts`: Get all prompts
- `GET /api/prompts/{id}`: Get prompt by ID
- `POST /api/prompts`: Create new prompt
- `PUT /api/prompts/{id}`: Update prompt
- `DELETE /api/prompts/{id}`: Delete prompt
- `GET /api/prompts/teams`: Get all team names
- `GET /api/prompts/models`: Get all model names
- `GET /api/prompts/team/{team_name}`: Get prompts by team
- `POST /api/prompts/search`: Search prompts

## Project Structure

```
py_backend/
├── app/
│   ├── __init__.py
│   ├── main.py               # FastAPI application entry point
│   ├── config.py             # Configuration settings
│   ├── db/
│   │   ├── __init__.py
│   │   └── dynamodb.py       # DynamoDB client and table operations
│   ├── models/
│   │   ├── __init__.py
│   │   └── prompt.py         # Pydantic models
│   ├── routers/
│   │   ├── __init__.py
│   │   └── prompts.py        # API routes
│   └── services/
│       ├── __init__.py
│       └── prompt_service.py # Business logic
├── scripts/
│   └── migrate_mongo_to_dynamo.py # Data migration script
├── .env                      # Environment variables
├── requirements.txt          # Python dependencies
└── README.md                 # This file
