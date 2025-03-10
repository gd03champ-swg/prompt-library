
import { useState, useEffect } from "react";
import { Prompt } from "@/types";
import { promptsData } from "@/data/prompts";

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading from an API
    const timer = setTimeout(() => {
      setPrompts(promptsData);
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
  
  return {
    prompts,
    loading,
    getPromptById,
    getPromptsByTeam,
    getAllTeams
  };
}
