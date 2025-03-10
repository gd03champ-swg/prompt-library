
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePrompts } from "@/hooks/usePrompts";
import { Header } from "@/components/Header";
import { PromptSearch } from "@/components/PromptSearch";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, SparklesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { PromptCard } from "@/components/PromptCard";

const PromptDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPromptById, loading, prompts, hasSearchResults, clearSearch } = usePrompts();
  const [prompt, setPrompt] = useState<any>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Clear any existing search results when navigating to detail page
    clearSearch();
    
    if (!loading && id) {
      const promptData = getPromptById(parseInt(id));
      setPrompt(promptData);
      
      if (!promptData) {
        navigate("/");
      }
    }
  }, [id, loading, getPromptById, navigate, clearSearch]);
  
  const handleCopyPrompt = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt.prompt);
      
      toast({
        title: "Copied to clipboard",
        description: "The prompt has been copied to your clipboard.",
        duration: 2000,
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container max-w-5xl pt-28 pb-20 px-4 md:px-8">
          <Button
            variant="ghost"
            className="mb-8 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to library
          </Button>
          
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-36" />
            
            <div className="p-6 rounded-xl border bg-card mt-6">
              <Skeleton className="h-5 w-48 mb-4" />
              <Skeleton className="h-24 w-full" />
            </div>
            
            <div className="bg-accent rounded-xl p-6 border mt-6">
              <Skeleton className="h-5 w-48 mb-4" />
              <Skeleton className="h-20 w-full" />
            </div>
            
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </main>
      </div>
    );
  }
  
  if (!prompt) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="container max-w-5xl pt-28 pb-20 px-4 md:px-8">
        <Button
          variant="ghost"
          className="mb-8 text-muted-foreground hover:text-foreground"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to library
        </Button>
        
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
        
        {prompt.howToUse && (
          <div className="bg-accent rounded-xl p-6 border mt-6">
            <h3 className="text-sm font-semibold text-accent-foreground mb-2">
              How to Use It
            </h3>
            <p className="text-base text-accent-foreground/90">
              {prompt.howToUse}
            </p>
          </div>
        )}
        
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
          
          {/* Display search results if any */}
          {hasSearchResults && (
            <div className="mt-12">
              <h3 className="text-xl font-medium mb-6">Search Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prompts.map((promptItem, index) => (
                  <PromptCard key={promptItem.id} prompt={promptItem} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PromptDetail;
