
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAddPromptModal } from "@/hooks/useAddPromptModal";
import { usePrompts } from "@/hooks/usePrompts";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

export function AddPromptModal() {
  const { isOpen, closeModal } = useAddPromptModal();
  const { getAllTeams, allPrompts } = usePrompts();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    teamName: "",
    useCase: "",
    prompt: "",
    examplePrompt: "",
    howToUse: ""
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, teamName: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Find the highest ID in the current prompts to generate a new one
      const highestId = Math.max(...allPrompts.map(p => p.id), 0);
      const newPrompt = {
        ...formData,
        id: highestId + 1
      };
      
      // In a real app, we would save to a database here
      console.log("Adding new prompt:", newPrompt);
      
      // For now, just pretend we saved it successfully
      toast({
        title: "Prompt added",
        description: "Your prompt has been added to the library.",
      });
      
      closeModal();
      setFormData({
        teamName: "",
        useCase: "",
        prompt: "",
        examplePrompt: "",
        howToUse: ""
      });
    } catch (error) {
      console.error("Error adding prompt:", error);
      toast({
        title: "Error",
        description: "There was an error adding your prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const teams = getAllTeams();
  const isFormValid = formData.teamName && formData.useCase && formData.prompt && formData.examplePrompt;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add your prompt</DialogTitle>
          <DialogDescription>
            Share your favorite prompt with the team. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Select 
              value={formData.teamName} 
              onValueChange={handleSelectChange}
            >
              <SelectTrigger id="teamName">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="useCase">Use Case</Label>
            <Input
              id="useCase"
              name="useCase"
              placeholder="E.g., Generate meeting notes"
              value={formData.useCase}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt Template</Label>
            <Textarea
              id="prompt"
              name="prompt"
              placeholder="Enter the prompt template here"
              className="min-h-[100px]"
              value={formData.prompt}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="examplePrompt">Example Prompt</Label>
            <Textarea
              id="examplePrompt"
              name="examplePrompt"
              placeholder="Enter an example of how to use the prompt"
              value={formData.examplePrompt}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="howToUse">How to Use (Optional)</Label>
            <Textarea
              id="howToUse"
              name="howToUse"
              placeholder="Provide additional tips on how to use this prompt effectively"
              value={formData.howToUse}
              onChange={handleChange}
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Prompt"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
