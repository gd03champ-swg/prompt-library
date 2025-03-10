
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePrompts } from "@/hooks/usePrompts";
import { Header } from "@/components/Header";
import { PromptCard } from "@/components/PromptCard";
import { FilterTeams } from "@/components/FilterTeams";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { 
    prompts, 
    loading, 
    getAllTeams, 
    selectedTeams, 
    setSelectedTeams,
    getRandomPrompt 
  } = usePrompts();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleFeelingLucky = () => {
    const randomPrompt = getRandomPrompt();
    
    if (randomPrompt) {
      navigate(`/prompt/${randomPrompt.id}`);
    } else {
      toast({
        title: "No prompts available",
        description: "Please select at least one team to find random prompts.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-7xl pt-28 pb-20 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Prompt Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of ready-to-use AI prompts to boost your productivity and creativity
          </p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <FilterTeams 
            teams={getAllTeams()} 
            selectedTeams={selectedTeams}
            onSelectionChange={setSelectedTeams}
          />
          
          <Button 
            onClick={handleFeelingLucky}
            className="gap-2 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90"
          >
            <Dices className="h-4 w-4" />
            I'm Feeling Lucky
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex justify-end">
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            ))}
          </div>
        ) : prompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt, index) => (
              <PromptCard key={prompt.id} prompt={prompt} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No prompts available for the selected teams. Please select at least one team.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
