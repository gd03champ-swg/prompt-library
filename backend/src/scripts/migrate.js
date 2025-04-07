const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const Prompt = require('../models/prompt');

async function migrateData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Read the prompts data file from the project
    const promptsFilePath = path.join(__dirname, '../../../src/data/prompts.ts');
    const fileContent = fs.readFileSync(promptsFilePath, 'utf8');
    
    // Extract the prompts array from the TS file using regex
    const matchResult = fileContent.match(/export const promptsData: Prompt\[\] = (\[[\s\S]*?\]);/);
    
    if (!matchResult || !matchResult[1]) {
      throw new Error('Could not parse prompts data from source file');
    }
    
    // Convert the TS array to a JS array
    const promptsArrayText = matchResult[1]
      .replace(/\/\/.*$/mg, '') // Remove comments
      .replace(/^\s*\n/mg, ''); // Remove empty lines
    
    // Parse the array (careful: this uses eval which is generally not recommended,
    // but it's okay for a one-time migration script)
    const promptsData = eval(promptsArrayText);
    
    // Clear existing data
    await Prompt.deleteMany({});
    console.log('Cleared existing prompts');
    
    // Insert all prompts
    const result = await Prompt.insertMany(promptsData);
    
    console.log(`${result.length} prompts successfully migrated to MongoDB`);
    
    // Create indexes
    await Prompt.createIndexes();
    console.log('Created indexes');
    
    // Close MongoDB connection
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
    
  } catch (error) {
    console.error('Error migrating data:', error);
    process.exit(1);
  }
}

migrateData();
