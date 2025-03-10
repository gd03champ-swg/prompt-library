
import { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { FilterButtons } from "./FilterButtons";
import { ActionButtons } from "./ActionButtons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isSearching: boolean;
  placeholder?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  onSearch,
  isSearching,
  placeholder
}: SearchBarProps) {
  const handleClearSearch = () => {
    onChange("");
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSearch]);

  return (
    <div className="relative rounded-xl border border-input/30 bg-background shadow-sm">
      <SearchInput 
        value={value}
        onChange={onChange}
        onClear={handleClearSearch}
        placeholder={placeholder}
      />
      
      <div className="flex items-center justify-between border-t border-input/30 px-4 py-2">
        <FilterButtons isSearching={isSearching} />
        <ActionButtons onSearch={onSearch} isSearching={isSearching} />
      </div>
    </div>
  );
}
