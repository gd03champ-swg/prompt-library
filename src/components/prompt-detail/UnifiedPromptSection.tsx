import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Pencil, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Prompt } from "@/types";
import { Separator } from "@/components/ui/separator";

interface UnifiedPromptSectionProps {
  prompt: Prompt;
  editedExamplePrompt: string;
  onExamplePromptChange: (value: string) => void;
}

export function UnifiedPromptSection({ 
  prompt, 
  editedExamplePrompt,
  onExamplePromptChange 
}: UnifiedPromptSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableExample, setEditableExample] = useState(editedExamplePrompt || prompt.examplePrompt);
  const { toast } = useToast();
  
  const handleSave = () => {
    onExamplePromptChange(editableExample);
    setIsEditing(false);
    
    toast({
      title: "Example updated",
      description: "Your changes have been saved.",
      duration: 2000,
    });
  };
  
  const handleCancel = () => {
    setEditableExample(editedExamplePrompt || prompt.examplePrompt);
    setIsEditing(false);
  };
  
  const handleCopy = () => {
    // Copy both prompt and example together
    const combinedPrompt = `${prompt.prompt}\n\n${editedExamplePrompt || prompt.examplePrompt}`;
    navigator.clipboard.writeText(combinedPrompt);
    
    toast({
      title: "Copied to clipboard",
      description: "The complete prompt has been copied to your clipboard.",
      duration: 2000,
    });
  };
  
  return (
    <div className={cn(
      "p-6 rounded-xl border border-primary/10 bg-card mt-6",
      "flex flex-col justify-between transition-all duration-200",
      "hover:border-primary/20 hover:shadow-sm"
    )}>
      {/* Header with copy button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center">
          <span className="text-primary mr-2">•</span>
          Prompt
        </h3>
        
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="flex-shrink-0"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Complete Prompt
        </Button>
      </div>
      
      {/* Template section */}
      <div className="mt-2">
        <div className="bg-muted/30 p-4 rounded-md font-mono text-sm whitespace-pre-wrap border border-muted">
          {prompt.prompt}
        </div>
      </div>
      
      {/* Separator between sections */}
      <Separator className="my-4" />
      
      {/* Example prompt section */}
      <div className="mt-2">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Example Prompt
          </h4>
          
          <Button 
            variant={isEditing ? "ghost" : "ghost"} 
            size="sm" 
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" />
                <span className="sr-only">Cancel</span>
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </>
            )}
          </Button>
        </div>
        
        {isEditing ? (
          <div className="space-y-3">
            <Textarea 
              value={editableExample} 
              onChange={(e) => setEditableExample(e.target.value)}
              className="min-h-[100px] font-mono text-sm resize-y"
              placeholder="Edit example prompt..."
            />
            <div className="flex justify-end">
              <Button onClick={handleSave} size="sm" className="gap-1">
                <Save className="h-3 w-3" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-muted/20 p-4 rounded-md font-mono text-sm whitespace-pre-wrap border border-dashed border-muted">
            {editableExample || prompt.examplePrompt}
          </div>
        )}
      </div>
    </div>
  );
}
