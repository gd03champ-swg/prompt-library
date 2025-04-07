const mongoose = require('mongoose');
const Prompt = require('../models/prompt');
require('dotenv').config();

async function updatePrompts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Update all prompts to add model field
    const result = await Prompt.updateMany(
      { model: { $exists: false } }, 
      { $set: { model: "claude-sonnet-3.5" } }
    );
    
    console.log(`${result.modifiedCount} prompts updated with default model: claude-sonnet-3.5`);
    
    // Close MongoDB connection
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
    
  } catch (error) {
    console.error('Error updating prompts:', error);
    process.exit(1);
  }
}

updatePrompts();
