import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModelSelector } from "@/components/ModelSelector";
import { Prompt } from "@/types";
import { ExternalLink, SparklesIcon } from "lucide-react";

interface SearchSectionProps {
  prompt: Prompt;
}

export function SearchSection({ prompt }: SearchSectionProps) {
  const [selectedModel, setSelectedModel] = useState(prompt.model || "claude-sonnet-3.5");
  
  const handleOpenInSwiggyChat = () => {
    // Construct the URL with the prompt and model
    const encodedPrompt = encodeURIComponent(prompt.prompt);
    const url = `https://chat.swiggy.cloud/?models=${selectedModel}&q=${encodedPrompt}`;
    
    // Open in a new tab
    window.open(url, '_blank');
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-center gap-2 mb-6">
        <SparklesIcon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-center">
          Open in Swiggy Chat
        </h2>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-full max-w-md space-y-2">
          <label className="text-sm font-medium">Select Model:</label>
          <ModelSelector 
            value={selectedModel} 
            onChange={setSelectedModel} 
          />
        </div>
        
        <Button 
          onClick={handleOpenInSwiggyChat}
          className="flex items-center gap-2"
          size="lg"
        >
          <ExternalLink className="h-4 w-4" />
          Open in Swiggy Chat
        </Button>
      </div>
    </div>
  );
}
