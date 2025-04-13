import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Pencil, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ExamplePromptSectionProps {
  examplePrompt: string;
  onExamplePromptChange: (value: string) => void;
}

export function ExamplePromptSection({ 
  examplePrompt, 
  onExamplePromptChange 
}: ExamplePromptSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableExample, setEditableExample] = useState(examplePrompt);
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
    setEditableExample(examplePrompt);
    setIsEditing(false);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(editableExample || examplePrompt);
    
    toast({
      title: "Copied to clipboard",
      description: "The example prompt has been copied to your clipboard.",
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
          Example Prompt
        </h3>
        
        <div className="flex gap-2">
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopy}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          )}
          
          <Button 
            variant={isEditing ? "destructive" : "secondary"} 
            size="sm" 
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </div>
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <Textarea 
            value={editableExample} 
            onChange={(e) => setEditableExample(e.target.value)}
            className="min-h-[150px] font-mono text-sm bg-muted/30 resize-y"
            placeholder="Edit example prompt..."
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <div className="bg-muted/30 p-4 rounded-md font-mono text-sm whitespace-pre-wrap border border-muted">
            {editableExample || examplePrompt}
          </div>
        </div>
      )}
    </div>
  );
}
