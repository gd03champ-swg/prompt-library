const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  teamName: {
    type: String,
    required: true,
    index: true
  },
  useCase: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  examplePrompt: {
    type: String,
    required: true
  },
  howToUse: {
    type: String
  },
  // Add model field with a default value
  model: {
    type: String,
    default: "claude-sonnet-3.5"
  }
}, { 
  timestamps: true 
});

// Add text index for search
promptSchema.index({ 
  useCase: 'text', 
  prompt: 'text', 
  teamName: 'text',
  examplePrompt: 'text'
});

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
