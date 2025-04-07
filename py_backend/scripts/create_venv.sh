#!/bin/bash
# Script to create a Python virtual environment and install dependencies

# Navigate to the correct directory (in case this script is called from elsewhere)
cd "$(dirname "$0")/.."

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

echo "Virtual environment created and dependencies installed."
echo "To activate the virtual environment, run: source venv/bin/activate"
