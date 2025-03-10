
import { Prompt } from "@/types";

interface PromptHeaderProps {
  prompt: Prompt;
}

export function PromptHeader({ prompt }: PromptHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {prompt.useCase}
      </h1>
      
      <div className="flex items-center text-muted-foreground">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
          {prompt.teamName}
        </span>
      </div>
    </div>
  );
}
