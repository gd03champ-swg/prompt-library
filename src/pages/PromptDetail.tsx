import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePrompts } from "@/hooks/usePrompts";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PromptHeader } from "@/components/prompt-detail/PromptHeader";
import { PromptContent } from "@/components/prompt-detail/PromptContent";
import { PromptHowToUse } from "@/components/prompt-detail/PromptHowToUse";
import { SearchSection } from "@/components/prompt-detail/SearchSection";
import { SearchResults } from "@/components/prompt-detail/SearchResults";
import { PromptDetailSkeleton } from "@/components/prompt-detail/PromptDetailSkeleton";
import { Prompt } from "@/types";

const PromptDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPromptById, loading, prompts, hasSearchResults, clearSearch } = usePrompts();
  const [prompt, setPrompt] = useState<Prompt | undefined>(undefined);
  const [promptLoading, setPromptLoading] = useState(false);
  
  // Split into two separate effects to avoid the infinite loop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    clearSearch();
  }, [id, clearSearch]); // Only clear search when id changes
  
  useEffect(() => {
    async function fetchPrompt() {
      if (!loading && id) {
        setPromptLoading(true);
        try {
          const promptData = await getPromptById(parseInt(id));
          setPrompt(promptData);
          
          if (!promptData) {
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching prompt:", error);
          navigate("/");
        } finally {
          setPromptLoading(false);
        }
      }
    }
    
    fetchPrompt();
  }, [id, loading, getPromptById, navigate]);
  
  if (loading || promptLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-5xl pt-28 pb-20 px-4 md:px-8">
          <PromptDetailSkeleton />
        </main>
      </div>
    );
  }
  
  if (!prompt) {
    return null;
  }
  
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
        
        <PromptHeader prompt={prompt} />
        <PromptContent prompt={prompt} />
        <PromptHowToUse prompt={prompt} />
        
        <SearchSection prompt={prompt} />
        <SearchResults hasResults={hasSearchResults} prompts={prompts} />
      </main>
    </div>
  );
};

export default PromptDetail;
