
import { useState, useEffect, useMemo } from "react";
import { Prompt } from "@/types";
import { promptsData } from "@/data/prompts";

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  
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
  
  const filteredPrompts = useMemo(() => {
    if (selectedTeams.length === 0) return [];
    return prompts.filter(prompt => selectedTeams.includes(prompt.teamName));
  }, [prompts, selectedTeams]);
  
  return {
    prompts: filteredPrompts,
    allPrompts: prompts,
    loading,
    getPromptById,
    getPromptsByTeam,
    getAllTeams,
    getRandomPrompt,
    selectedTeams,
    setSelectedTeams
  };
}
