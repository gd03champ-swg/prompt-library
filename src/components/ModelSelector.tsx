import { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newModel, setNewModel] = useState("");
  const [open, setOpen] = useState(false);

  // Fetch existing models
  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await apiService.getAllModels();
        setModels(data);
        
        // If no model is selected and we have models, select the first one
        if ((!value || value.trim() === '') && data.length > 0) {
          onChange(data[0]);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchModels();
  }, [value, onChange]);

  const handleCreateModel = () => {
    if (newModel.trim()) {
      // No need to make an API call since we're not storing models separately
      // Just add to the local list for now - it'll be saved with the prompt
      const updatedModels = [...models];
      if (!updatedModels.includes(newModel)) {
        updatedModels.push(newModel);
        setModels(updatedModels);
      }
      onChange(newModel);
      setNewModel("");
      setIsCreating(false);
      setOpen(false);
    }
  };

  if (loading) {
    return <div className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading models...</div>;
  }

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value || "Select model..."}
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="p-2">
            {isCreating ? (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="New model name..."
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                />
                <Button 
                  size="sm" 
                  onClick={handleCreateModel} 
                  disabled={!newModel.trim()}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="grid gap-2">
                {models.map((model) => (
                  <Button
                    key={model}
                    variant={model === value ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      onChange(model);
                      setOpen(false);
                    }}
                  >
                    {model}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add new model
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
