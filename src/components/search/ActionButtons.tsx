
import { Button } from "@/components/ui/button";
import { Paperclip, AtSign, Globe, ChevronDown, ArrowRight } from "lucide-react";

interface ActionButtonsProps {
  onSearch: () => void;
  isSearching: boolean;
}

export function ActionButtons({ onSearch, isSearching }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-accent"
        aria-label="Attach file"
      >
        <Paperclip className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-accent"
        aria-label="Mention"
      >
        <AtSign className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-accent"
        aria-label="Options"
      >
        <Globe className="h-4 w-4" />
        <ChevronDown className="h-3 w-3 ml-1" />
      </Button>

      <Button
        onClick={onSearch}
        size="icon"
        className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
        disabled={isSearching}
        aria-label="Search"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
