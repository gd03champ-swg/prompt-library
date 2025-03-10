import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  RefreshCcw,
  Globe,
  Sparkles,
  Paperclip,
  AtSign,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { usePrompts } from "@/hooks/usePrompts";
import { cn } from "@/lib/utils";

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
        <div className="relative rounded-xl border border-input/30 bg-background shadow-sm">
          <div className="flex items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => setSearchValue("")}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 py-6 placeholder:text-muted-foreground/60"
              placeholder={isFocused ? "" : "Ask to find answers from your Apps"}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <div className="flex items-center justify-between border-t border-input/30 px-4 py-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-full bg-accent/30 hover:bg-accent/50 border-none gap-1"
              >
                <div className="flex items-center justify-center rounded-sm bg-red-500 w-4 h-4">
                  <Globe className="h-3 w-3 text-white" />
                </div>
                <span>Apps</span>
                <ChevronDown className="h-3 w-3" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-full hover:bg-accent gap-1"
              >
                <Globe className="h-4 w-4" />
                <span>Web</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-full hover:bg-accent gap-1"
              >
                <Sparkles className="h-4 w-4" />
                <span>AI Only</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-accent"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-accent"
              >
                <AtSign className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-accent"
              >
                <Globe className="h-4 w-4" />
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>

              <Button
                onClick={handleSearch}
                size="icon"
                className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
                disabled={isSearching}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
