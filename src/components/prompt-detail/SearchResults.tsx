
import { Prompt } from "@/types";
import { PromptCard } from "@/components/PromptCard";

interface SearchResultsProps {
  hasResults: boolean;
  prompts: Prompt[];
}

export function SearchResults({ hasResults, prompts }: SearchResultsProps) {
  if (!hasResults) {
    return null;
  }
  
  return (
    <div className="mt-12">
      <h3 className="text-xl font-medium mb-6">Search Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((promptItem, index) => (
          <PromptCard key={promptItem.id} prompt={promptItem} index={index} />
        ))}
      </div>
    </div>
  );
}
