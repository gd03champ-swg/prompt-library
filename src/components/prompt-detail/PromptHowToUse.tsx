
import { Prompt } from "@/types";

interface PromptHowToUseProps {
  prompt: Prompt;
}

export function PromptHowToUse({ prompt }: PromptHowToUseProps) {
  if (!prompt.howToUse) {
    return null;
  }
  
  return (
    <div className="bg-accent rounded-xl p-6 border mt-6">
      <h3 className="text-sm font-semibold text-accent-foreground mb-2">
        How to Use It
      </h3>
      <p className="text-base text-accent-foreground/90">
        {prompt.howToUse}
      </p>
    </div>
  );
}
