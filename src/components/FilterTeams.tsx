
import { useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FilterTeamsProps {
  teams: string[];
  selectedTeams: string[];
  onSelectionChange: (teams: string[]) => void;
}

export function FilterTeams({ teams, selectedTeams, onSelectionChange }: FilterTeamsProps) {
  const [open, setOpen] = useState(false);
  
  const handleSelectAll = () => {
    onSelectionChange(teams);
  };
  
  const handleClearAll = () => {
    onSelectionChange([]);
  };
  
  const toggleTeam = (team: string) => {
    if (selectedTeams.includes(team)) {
      onSelectionChange(selectedTeams.filter(t => t !== team));
    } else {
      onSelectionChange([...selectedTeams, team]);
    }
  };
  
  // Count selected teams for display
  const selectedCount = selectedTeams.length;
  const isAllSelected = selectedCount === teams.length;
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "flex gap-2 text-base",
            selectedCount > 0 && "border-primary/50 bg-primary/5 text-primary"
          )}
        >
          <Filter className="h-4 w-4" />
          Filter by team
          {selectedCount > 0 && (
            <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
              {selectedCount}
            </span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-56 bg-card/95 backdrop-blur-md border-border/40"
      >
        <DropdownMenuLabel>Select Teams</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {teams.map((team) => (
          <DropdownMenuCheckboxItem
            key={team}
            checked={selectedTeams.includes(team)}
            onCheckedChange={() => toggleTeam(team)}
            className="capitalize"
          >
            {team}
            {selectedTeams.includes(team) && (
              <Check className="h-4 w-4 ml-auto" />
            )}
          </DropdownMenuCheckboxItem>
        ))}
        
        <DropdownMenuSeparator />
        <div className="p-2 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSelectAll}
            className="text-xs"
            disabled={isAllSelected}
          >
            Select All
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearAll}
            className="text-xs"
            disabled={selectedCount === 0}
          >
            Clear All
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
