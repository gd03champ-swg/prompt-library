
import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, onClear, placeholder }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className="flex items-center px-4">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={onClear}
        aria-label="Clear search"
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>
      
      <Input
        value={value}
        onChange={handleChange}
        className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 py-6 placeholder:text-muted-foreground/60"
        placeholder={isFocused ? "" : placeholder || "Ask to find answers from your Apps"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
