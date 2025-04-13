
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Prompt } from "@/types";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptContentProps {
  prompt: Prompt;
}

export function PromptContent({ prompt }: PromptContentProps) {
  const { toast } = useToast();
  
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt);
    
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
      duration: 2000,
    });
  };
  
  return (
    <div className={cn(
      "p-6 rounded-xl border border-primary/20 bg-card mt-6",
      "flex flex-col justify-between transition-all duration-200",
      "hover:border-primary/30 hover:shadow-sm"
    )}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center">
          <span className="text-primary mr-2">•</span>
          Prompt Template
        </h3>
        
        <Button
          onClick={handleCopyPrompt}
          variant="outline"
          size="sm"
          className="flex-shrink-0"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </div>
      
      <div className="mt-2">
        <div className="bg-muted/30 p-4 rounded-md font-mono text-sm whitespace-pre-wrap border border-muted">
          {prompt.prompt}
        </div>
      </div>
    </div>
  );
}
