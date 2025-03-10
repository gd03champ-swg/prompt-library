
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface FilterButtonsProps {
  isSearching?: boolean;
}

export function FilterButtons({ isSearching = false }: FilterButtonsProps) {
  const buttonVariants = {
    initial: { scale: 1, opacity: 1 },
    searching: { scale: isSearching ? 0.97 : 1, opacity: isSearching ? 0.7 : 1 },
  };

  return (
    <motion.div 
      className="flex items-center gap-2"
      animate={isSearching ? "searching" : "initial"}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        variants={buttonVariants}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-full bg-accent/30 hover:bg-accent/50 border-none gap-1"
        >
          <div className="flex items-center justify-center rounded-sm bg-red-500 w-4 h-4">
            <Globe className="h-3 w-3 text-white" />
          </div>
          <span>Apps</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-8 rounded-full hover:bg-accent gap-1"
        >
          <Globe className="h-4 w-4" />
          <span>Web</span>
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="h-8 rounded-full hover:bg-accent gap-1"
        >
          <Sparkles className="h-4 w-4" />
          <span>AI Only</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
