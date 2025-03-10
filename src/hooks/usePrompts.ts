
import { useState, useEffect, useMemo } from "react";
import { Prompt } from "@/types";
import { promptsData } from "@/data/prompts";

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Prompt[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    // Simulate loading from an API
    const timer = setTimeout(() => {
      setPrompts(promptsData);
      
      // Set all teams as initially selected
      const allTeams = [...new Set(promptsData.map(prompt => prompt.teamName))];
      setSelectedTeams(allTeams);
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getPromptById = (id: number): Prompt | undefined => {
    return prompts.find(prompt => prompt.id === id);
  };
  
  const getPromptsByTeam = (teamName: string): Prompt[] => {
    return prompts.filter(prompt => prompt.teamName === teamName);
  };
  
  const getAllTeams = (): string[] => {
    const teams = prompts.map(prompt => prompt.teamName);
    return [...new Set(teams)];
  };
  
  const getRandomPrompt = (): Prompt | undefined => {
    if (filteredPrompts.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
    return filteredPrompts[randomIndex];
  };
  
  const searchPromptsWithLLM = async (query: string): Promise<void> => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Call the real API endpoint for LLM-powered search
      const response = await fetch(`/api/search-prompts?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      setSearchResults(data.results || []);
      
      // If API fails or returns no results, fallback to local filtering
      if (!data.results || data.results.length === 0) {
        console.log("No results from API, falling back to local search");
        
        // Basic local filtering as fallback
        const localResults = filteredPrompts.filter(prompt => {
          const content = `${prompt.useCase} ${prompt.prompt} ${prompt.teamName}`.toLowerCase();
          const searchTerm = query.toLowerCase();
          return content.includes(searchTerm);
        });
        
        setSearchResults(localResults);
      }
      
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
  };
  
  const clearSearch = () => {
    setSearchResults([]);
  };
  
  const filteredPrompts = useMemo(() => {
    if (selectedTeams.length === 0) return [];
    return prompts.filter(prompt => selectedTeams.includes(prompt.teamName));
  }, [prompts, selectedTeams]);
  
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
    hasSearchResults: searchResults.length > 0
  };
}
