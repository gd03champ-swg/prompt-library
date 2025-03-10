
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Search as SearchIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { usePrompts } from "@/hooks/usePrompts";

interface PromptSearchProps {
  defaultPrompt?: string;
  examplePrompt?: string;
  onSearch?: boolean;
}

export function PromptSearch({ defaultPrompt, examplePrompt, onSearch = false }: PromptSearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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
  
  const handleCopy = () => {
    navigator.clipboard.writeText(
      (defaultPrompt ? defaultPrompt + "\n\n" : "") + (searchValue || examplePrompt || "")
    );
    
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
      duration: 2000,
    });
  };
  
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
    
    if (onSearch) {
      searchPromptsWithLLM(valueToSearch);
    } else {
      // If we're on the detail page, let's navigate to home with the search query
      navigate(`/?search=${encodeURIComponent(valueToSearch)}`);
    }
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    if (!searchValue && examplePrompt) {
      setSearchValue("");
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    if (!searchValue && examplePrompt) {
      setSearchValue("");
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
        <div className="relative">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full py-6 px-4 text-base rounded-xl border-input focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary/50"
            placeholder={isFocused ? "Enter your specific query here..." : ""}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          
          {!isFocused && !searchValue && examplePrompt && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
              {examplePrompt}
            </div>
          )}
          
          <Button
            onClick={handleCopy}
            size="sm"
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Copy className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </div>
        
        <div className="flex justify-end">
          <Button 
            className="bg-primary hover:bg-primary/90 transition-colors duration-300 gap-2"
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <SearchIcon className="h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
