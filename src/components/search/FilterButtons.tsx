
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, Sparkles } from "lucide-react";

export function FilterButtons() {
  return (
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
  );
}
