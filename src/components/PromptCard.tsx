
import { Prompt } from "@/types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

export function PromptCard({ prompt, index }: PromptCardProps) {
  const navigate = useNavigate();
  
  // Calculate animation delay based on index for staggered animations
  const delay = index * 0.05;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" 
      }}
      className={cn(
        "group bg-card rounded-xl p-6 cursor-pointer soft-shadow",
        "border border-border/40 hover:border-primary/20",
        "transition-all duration-300 h-full flex flex-col"
      )}
      onClick={() => navigate(`/prompt/${prompt.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
          {prompt.teamName}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
        {prompt.useCase}
      </h3>
      
      <p className="text-sm text-muted-foreground line-clamp-3 flex-grow mb-4">
        {prompt.prompt.length > 140 
          ? `${prompt.prompt.substring(0, 140)}...` 
          : prompt.prompt
        }
      </p>
      
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground/70 group-hover:text-primary/70 transition-colors duration-300">
          Click to view details →
        </span>
      </div>
    </motion.div>
  );
}
