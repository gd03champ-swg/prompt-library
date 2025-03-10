
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
      // Simulate LLM-based search with some basic text matching
      // In a real implementation, this would call an actual LLM API
      console.log("Searching with query:", query);
      
      // Simulated LLM search based on relevance
      const results = filteredPrompts.filter(prompt => {
        const content = `${prompt.useCase} ${prompt.prompt} ${prompt.teamName}`.toLowerCase();
        const searchTerm = query.toLowerCase();
        return content.includes(searchTerm);
      });
      
      // Add a slight delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Sort results by relevance (most relevant first)
      // In a real LLM implementation, this would be handled by the model
      const sortedResults = [...results].sort((a, b) => {
        const scoreA = calculateRelevanceScore(a, query);
        const scoreB = calculateRelevanceScore(b, query);
        return scoreB - scoreA;
      });
      
      setSearchResults(sortedResults);
    } catch (error) {
      console.error("Error searching prompts:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Helper function to calculate a basic relevance score
  const calculateRelevanceScore = (prompt: Prompt, query: string): number => {
    const content = `${prompt.useCase} ${prompt.prompt}`.toLowerCase();
    const searchTerm = query.toLowerCase();
    
    // Count occurrences
    let score = 0;
    let startIndex = 0;
    while (true) {
      const index = content.indexOf(searchTerm, startIndex);
      if (index === -1) break;
      score += 1;
      startIndex = index + 1;
    }
    
    // Boost score if query appears in useCase
    if (prompt.useCase.toLowerCase().includes(searchTerm)) {
      score += 3;
    }
    
    return score;
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
