const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

// GET all prompts
router.get('/', promptController.getAllPrompts);

// GET all model names
router.get('/models', promptController.getAllModels);

// GET all unique team names
router.get('/teams', promptController.getAllTeams);

// POST search prompts
router.post('/search', promptController.searchPrompts);

// GET prompts by team
router.get('/team/:teamName', promptController.getPromptsByTeam);

// GET a single prompt by ID
router.get('/:id', promptController.getPromptById);

// POST create a new prompt
router.post('/', promptController.createPrompt);

// PUT update a prompt
router.put('/:id', promptController.updatePrompt);

// DELETE a prompt
router.delete('/:id', promptController.deletePrompt);

module.exports = router;