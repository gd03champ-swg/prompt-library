
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { usePrompts } from "@/hooks/usePrompts";
import { SearchBar } from "./search/SearchBar";

interface PromptSearchProps {
  defaultPrompt?: string;
  examplePrompt?: string;
  onSearch?: boolean;
}

export function PromptSearch({ defaultPrompt, examplePrompt, onSearch = false }: PromptSearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { searchPromptsWithLLM, isSearching } = usePrompts();
  
  // Debounce search input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchValue);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchValue);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchValue]);
  
  // Check if we're on the detail page and extract search param from URL if present
  useEffect(() => {
    // Only run this on the home page
    if (location.pathname === '/') {
      const searchParams = new URLSearchParams(location.search);
      const searchQuery = searchParams.get('search');
      
      if (searchQuery) {
        setSearchValue(searchQuery);
        // Trigger search if we have a query param and onSearch is true
        if (onSearch) {
          searchPromptsWithLLM(searchQuery);
        }
      }
    }
  }, [location, onSearch, searchPromptsWithLLM]);
  
  // Perform search when debounced search term changes and onSearch is true
  useEffect(() => {
    if (onSearch && debouncedSearchTerm.trim()) {
      searchPromptsWithLLM(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch, searchPromptsWithLLM]);
  
  const handleSearch = () => {
    const valueToSearch = searchValue.trim() || (examplePrompt || "").trim();
    
    if (valueToSearch === "") {
      toast({
        title: "Empty search",
        description: "Please enter a search query",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // On the detail page, perform the search directly instead of navigating
    if (location.pathname.startsWith('/prompt/')) {
      // Set onSearch to true to enable search
      searchPromptsWithLLM(valueToSearch);
      
      // Show a toast to confirm search is running
      toast({
        title: "Searching prompts",
        description: "Using AI to find relevant prompts...",
        duration: 3000,
      });
    } else if (onSearch) {
      searchPromptsWithLLM(valueToSearch);
    } else {
      // If we're not on the detail page or onSearch isn't true, navigate to home
      navigate(`/?search=${encodeURIComponent(valueToSearch)}`);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-col gap-2">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          isSearching={isSearching}
          placeholder="Ask to find answers from your Apps"
        />
      </div>
    </motion.div>
  );
}
