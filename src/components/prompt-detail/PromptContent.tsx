
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
      "p-6 rounded-xl border bg-card mt-6",
      "flex flex-col md:flex-row justify-between items-start gap-4"
    )}>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
          Prompt
        </h3>
        <p className="text-base">{prompt.prompt}</p>
      </div>
      
      <Button
        onClick={handleCopyPrompt}
        variant="outline"
        className="flex-shrink-0"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
    </div>
  );
}
