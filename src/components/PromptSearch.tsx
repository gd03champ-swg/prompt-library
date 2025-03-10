
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";

interface PromptSearchProps {
  defaultPrompt?: string;
  examplePrompt?: string;
}

export function PromptSearch({ defaultPrompt, examplePrompt }: PromptSearchProps) {
  const [searchValue, setSearchValue] = useState(examplePrompt || "");
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(
      (defaultPrompt ? defaultPrompt + "\n\n" : "") + searchValue
    );
    
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
      duration: 2000,
    });
  };
  
  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full py-6 px-4 text-base rounded-xl border-input focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary/50"
            placeholder="Enter your specific query here..."
          />
          
          <Button
            onClick={handleCopy}
            size="sm"
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Copy className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </div>
        
        <div className="flex justify-end">
          <Button className="bg-primary hover:bg-primary/90 transition-colors duration-300">
            Search
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
