import { Prompt } from '@/types';

const API_URL = 'https://chat-prompts-backend.swiggy.cloud/api';

export const apiService = {
  // Get all models
  async getAllModels(): Promise<string[]> {
    try {
      const response = await fetch(`${API_URL}/prompts/models/`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },
  
  // Get all prompts
  async getAllPrompts(selectedTeams?: string[]): Promise<Prompt[]> {
    try {
      let url = `${API_URL}/prompts/`;
      
      if (selectedTeams && selectedTeams.length > 0) {
        url += `?teams=${selectedTeams.join(',')}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching prompts:', error);
      throw error;
    }
  },
  
  // Get a prompt by ID
  async getPromptById(id: number): Promise<Prompt | undefined> {
    try {
      const response = await fetch(`${API_URL}/prompts/${id}/`);
      
      if (response.status === 404) {
        return undefined;
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error fetching prompt ${id}:`, error);
      throw error;
    }
  },
  
  // Get prompts by team
  async getPromptsByTeam(teamName: string): Promise<Prompt[]> {
    try {
      const response = await fetch(`${API_URL}/prompts/team/${encodeURIComponent(teamName)}/`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error fetching prompts for team ${teamName}:`, error);
      throw error;
    }
  },
  
  // Get all teams
  async getAllTeams(): Promise<string[]> {
    try {
      const response = await fetch(`${API_URL}/prompts/teams/`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  },
  
  // Add a new prompt
  async addPrompt(prompt: Omit<Prompt, 'id'>): Promise<Prompt> {
    try {
      const response = await fetch(`${API_URL}/prompts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error adding prompt:', error);
      throw error;
    }
  },
  
  // Search prompts
  async searchPrompts(query: string, teams: string[]): Promise<Prompt[]> {
    try {
      const response = await fetch(`${API_URL}/prompts/search/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, teams }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error searching prompts:', error);
      throw error;
    }
  }
};
