import { useState, useEffect, useMemo, useCallback } from "react";
import { Prompt } from "@/types";
import { apiService } from "@/services/api";

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Prompt[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    async function loadPrompts() {
      try {
        const data = await apiService.getAllPrompts();
        setPrompts(data);
        
        // Set all teams as initially selected
        const allTeams = [...new Set(data.map(prompt => prompt.teamName))];
        setSelectedTeams(allTeams);
      } catch (error) {
        console.error("Error loading prompts:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPrompts();
  }, []);
  
  // Define filteredPrompts
  const filteredPrompts = useMemo(() => {
    if (selectedTeams.length === 0) return [];
    return prompts.filter(prompt => selectedTeams.includes(prompt.teamName));
  }, [prompts, selectedTeams]);
  
  const getPromptById = useCallback(async (id: number): Promise<Prompt | undefined> => {
    try {
      const prompt = await apiService.getPromptById(id);
      return prompt || undefined;
    } catch (error) {
      console.error(`Error fetching prompt ${id}:`, error);
      return undefined;
    }
  }, []);
  
  const getPromptsByTeam = useCallback(async (teamName: string): Promise<Prompt[]> => {
    try {
      return await apiService.getPromptsByTeam(teamName);
    } catch (error) {
      console.error(`Error fetching prompts for team ${teamName}:`, error);
      return [];
    }
  }, []);
  
  const getAllTeams = (): string[] => {
    const teams = prompts.map(prompt => prompt.teamName);
    return [...new Set(teams)];
  };
  
  const getRandomPrompt = (): Prompt | undefined => {
    if (filteredPrompts.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
    return filteredPrompts[randomIndex];
  };
  
  const addPrompt = async (newPrompt: Omit<Prompt, "id">): Promise<Prompt> => {
    try {
      const promptWithId = await apiService.addPrompt(newPrompt);
      setPrompts(prevPrompts => [...prevPrompts, promptWithId]);
      return promptWithId;
    } catch (error) {
      console.error("Error adding prompt:", error);
      throw error;
    }
  };
  
  const searchPromptsWithLLM = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Use the API search endpoint
      const results = await apiService.searchPrompts(query, selectedTeams);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching prompts:", error);
      
      // Fallback to local search in case of API failure
      const localResults = filteredPrompts.filter(prompt => {
        const content = `${prompt.useCase} ${prompt.prompt} ${prompt.teamName}`.toLowerCase();
        const searchTerm = query.toLowerCase();
        return content.includes(searchTerm);
      });
      
      setSearchResults(localResults);
    } finally {
      setIsSearching(false);
    }
  }, [filteredPrompts, selectedTeams]);
  
  const clearSearch = () => {
    setSearchResults([]);
  };
  
  // Determine which prompts to show: search results or filtered prompts
  const displayPrompts = searchResults.length > 0 ? searchResults : filteredPrompts;
  
  return {
    prompts: displayPrompts,
    allPrompts: prompts,
    loading,
    isSearching,
    getPromptById,
    getPromptsByTeam,
    getAllTeams,
    getRandomPrompt,
    selectedTeams,
    setSelectedTeams,
    searchPromptsWithLLM,
    clearSearch,
    hasSearchResults: searchResults.length > 0,
    addPrompt
  };
}