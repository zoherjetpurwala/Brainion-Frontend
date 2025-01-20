import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  toggleSearchBar: any;
}

export function SearchBar({
  placeholder = "Search...",
  onSearch,
  toggleSearchBar,
}: SearchBarProps) {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full flex gap-1">
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          aria-hidden="true"
        />
        <input
          type="search"
          className="w-full ring-blue-800/10 shadow-md shadow-blue-800/15 rounded-2xl border border-gray-300 bg-white  py-3 pl-10 pr-4 text-sm text-gray-900 ring-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={placeholder}
        />
      </div>
      <button type="submit" className="sr-only">
        Search
      </button>
      <button
        onClick={toggleSearchBar}
        className="p-3 ring-[1px] ring-blue-800/10 shadow-md shadow-blue-800/15 text-2xl rounded-2xl text-gray-600 bg-white hover:text-gray-800 transition-colors"
        aria-label="Close search"
      >
        <X className="w-4 h-4" />
      </button>
    </form>
  );
}
