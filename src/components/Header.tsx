
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8 py-4 glass",
        scrolled 
          ? "bg-background/80 border-b backdrop-blur-lg" 
          : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <span className="text-primary text-xl font-semibold">AI</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Swiggy AI Hub
          </h1>
        </div>
        
        {location.pathname === "/" && (
          <div className="hidden md:flex items-center gap-2 bg-secondary rounded-full px-4 py-2 text-sm text-muted-foreground">
            <Search className="w-4 h-4" />
            <span>Search prompts...</span>
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className={cn(
              "text-sm font-medium transition-colors",
              location.pathname === "/"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Prompt Library
          </button>
        </div>
      </div>
    </header>
  );
}
