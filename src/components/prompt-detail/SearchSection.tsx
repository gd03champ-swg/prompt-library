
import { PromptSearch } from "@/components/PromptSearch";
import { SparklesIcon } from "lucide-react";
import { Prompt } from "@/types";

interface SearchSectionProps {
  prompt: Prompt;
}

export function SearchSection({ prompt }: SearchSectionProps) {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-center gap-2 mb-6">
        <SparklesIcon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-center">
          AI-powered Search
        </h2>
      </div>
      
      <PromptSearch 
        defaultPrompt={prompt.prompt}
        examplePrompt={prompt.examplePrompt}
        onSearch={true}
      />
    </div>
  );
}
