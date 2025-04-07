const Prompt = require('../models/prompt');

// Get all distinct model names
exports.getAllModels = async (req, res) => {
  try {
    const models = await Prompt.distinct('model');
    res.status(200).json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ message: 'Error fetching models', error: error.message });
  }
};

// Get all prompts with optional filtering
exports.getAllPrompts = async (req, res) => {
  try {
    const { teams } = req.query;
    let query = {};
    
    // Filter by teams if provided
    if (teams) {
      const teamsList = teams.split(',');
      query.teamName = { $in: teamsList };
    }
    
    const prompts = await Prompt.find(query).sort({ id: 1 });
    res.status(200).json(prompts);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    res.status(500).json({ message: 'Error fetching prompts', error: error.message });
  }
};

// Get a single prompt by ID
exports.getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ id: req.params.id });
    
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    
    res.status(200).json(prompt);
  } catch (error) {
    console.error(`Error fetching prompt ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error fetching prompt', error: error.message });
  }
};

// Create a new prompt
exports.createPrompt = async (req, res) => {
  try {
    // Find the highest ID to generate a new one
    const highestPrompt = await Prompt.findOne().sort({ id: -1 });
    const newId = highestPrompt ? highestPrompt.id + 1 : 1;
    
    const promptData = {
      ...req.body,
      id: newId
    };
    
    const newPrompt = await Prompt.create(promptData);
    res.status(201).json(newPrompt);
  } catch (error) {
    console.error('Error creating prompt:', error);
    res.status(500).json({ message: 'Error creating prompt', error: error.message });
  }
};

// Update a prompt
exports.updatePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    
    const prompt = await Prompt.findOneAndUpdate(
      { id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    
    res.status(200).json(prompt);
  } catch (error) {
    console.error(`Error updating prompt ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error updating prompt', error: error.message });
  }
};

// Delete a prompt
exports.deletePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    
    const prompt = await Prompt.findOneAndDelete({ id });
    
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    
    res.status(200).json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    console.error(`Error deleting prompt ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error deleting prompt', error: error.message });
  }
};

// Get prompts by team
exports.getPromptsByTeam = async (req, res) => {
  try {
    const { teamName } = req.params;
    
    const prompts = await Prompt.find({ teamName }).sort({ id: 1 });
    
    res.status(200).json(prompts);
  } catch (error) {
    console.error(`Error fetching prompts for team ${req.params.teamName}:`, error);
    res.status(500).json({ message: 'Error fetching prompts by team', error: error.message });
  }
};

// Get all unique team names
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Prompt.distinct('teamName');
    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Error fetching teams', error: error.message });
  }
};

// Search prompts
exports.searchPrompts = async (req, res) => {
  try {
    const { query, teams } = req.body;
    
    if (!query || !query.trim()) {
      return res.status(200).json([]);
    }
    
    let searchQuery = {};
    
    // Basic text search
    if (query) {
      searchQuery.$or = [
        { useCase: { $regex: query, $options: 'i' } },
        { prompt: { $regex: query, $options: 'i' } },
        { teamName: { $regex: query, $options: 'i' } },
        { examplePrompt: { $regex: query, $options: 'i' } }
      ];
    }
    
    // Add team filter if specified
    if (teams && teams.length > 0) {
      searchQuery.teamName = { $in: teams };
    }
    
    const results = await Prompt.find(searchQuery).limit(10);
    
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching prompts:', error);
    res.status(500).json({ message: 'Error searching prompts', error: error.message });
  }
};
