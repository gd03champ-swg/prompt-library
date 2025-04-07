#!/bin/bash

# Check if MongoDB is running
if pgrep -x "mongod" > /dev/null
then
    echo "MongoDB is already running"
else
    echo "Starting MongoDB..."
    # For macOS with homebrew
    if [ -f /usr/local/bin/brew ] || [ -f /opt/homebrew/bin/brew ]
    then
        brew services start mongodb-community
    else
        # For Linux
        if [ -f /etc/init.d/mongodb ]
        then
            sudo service mongodb start
        elif [ -f /usr/bin/systemctl ]
        then
            sudo systemctl start mongod
        else
            echo "Could not determine how to start MongoDB. Please start it manually."
            exit 1
        fi
    fi
    
    echo "MongoDB started"
fi
