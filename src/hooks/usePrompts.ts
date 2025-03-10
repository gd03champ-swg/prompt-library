
import { useState, useEffect, useMemo, useCallback } from "react";
import { Prompt } from "@/types";
import { promptsData } from "@/data/prompts";
import { supabase } from "@/integrations/supabase/client";

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
  
  // Define filteredPrompts before it's used in searchPromptsWithLLM
  const filteredPrompts = useMemo(() => {
    if (selectedTeams.length === 0) return [];
    return prompts.filter(prompt => selectedTeams.includes(prompt.teamName));
  }, [prompts, selectedTeams]);
  
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
  
  const searchPromptsWithLLM = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Call our Supabase edge function
      const { data, error } = await supabase.functions.invoke('search-prompts', {
        body: { 
          query, 
          prompts: filteredPrompts // Send the filtered prompts to search through
        }
      });
      
      if (error) {
        console.error("Error from Supabase function:", error);
        throw error;
      }
      
      console.log("Search results from Gemini:", data.results);
      
      if (data.results && data.results.length > 0) {
        setSearchResults(data.results);
      } else {
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
  }, [filteredPrompts]);
  
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
    hasSearchResults: searchResults.length > 0
  };
}
