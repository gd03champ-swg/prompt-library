
import { useState, useEffect } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Clock, X } from "lucide-react";

const MAX_HISTORY_ITEMS = 5;

// Helper functions for localStorage
const getSearchHistory = (): string[] => {
  const history = localStorage.getItem("searchHistory");
  return history ? JSON.parse(history) : [];
};

const saveSearchHistory = (history: string[]): void => {
  localStorage.setItem("searchHistory", JSON.stringify(history));
};

export const addToSearchHistory = (query: string): void => {
  if (!query.trim()) return;
  
  const history = getSearchHistory();
  
  // Remove the query if it already exists to avoid duplicates
  const filteredHistory = history.filter(item => item !== query);
  
  // Add the new query at the beginning
  const newHistory = [query, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
  
  saveSearchHistory(newHistory);
};

export const clearSearchHistory = (): void => {
  localStorage.removeItem("searchHistory");
};

interface SearchHistoryProps {
  onSelectHistory: (query: string) => void;
}

export function SearchHistory({ onSelectHistory }: SearchHistoryProps) {
  const [history, setHistory] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    setHistory(getSearchHistory());
    
    // Add event listener to update history when it changes in another component
    const handleStorageChange = () => {
      setHistory(getSearchHistory());
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  const handleClearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearSearchHistory();
    setHistory([]);
  };
  
  const handleSelectItem = (query: string) => {
    onSelectHistory(query);
    setOpen(false);
  };
  
  if (history.length === 0) {
    return null;
  }
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-accent"
          aria-label="Search history"
        >
          <Clock className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[300px]">
        <div className="flex items-center justify-between p-2">
          <span className="text-sm font-semibold">Recent searches</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs" 
            onClick={handleClearHistory}
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
        {history.map((query, index) => (
          <DropdownMenuItem 
            key={index} 
            className="cursor-pointer truncate" 
            onClick={() => handleSelectItem(query)}
          >
            {query}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
