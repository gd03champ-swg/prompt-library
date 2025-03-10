
import { Button } from "@/components/ui/button";
import { Paperclip, AtSign, Globe, ChevronDown, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ActionButtonsProps {
  onSearch: () => void;
  isSearching: boolean;
}

export function ActionButtons({ onSearch, isSearching }: ActionButtonsProps) {
  const buttonVariants = {
    initial: { scale: 1, opacity: 1 },
    searching: { scale: 0.95, opacity: 0.7 }
  };

  const searchButtonVariants = {
    initial: { scale: 1, rotate: 0 },
    searching: { scale: 1, rotate: 360 },
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
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-accent"
          aria-label="Attach file"
          disabled={isSearching}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-accent"
          aria-label="Mention"
          disabled={isSearching}
        >
          <AtSign className="h-4 w-4" />
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-accent"
          aria-label="Options"
          disabled={isSearching}
        >
          <Globe className="h-4 w-4" />
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </motion.div>

      <motion.div
        variants={searchButtonVariants}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Button
          onClick={onSearch}
          size="icon"
          className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
          disabled={isSearching}
          aria-label="Search"
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
