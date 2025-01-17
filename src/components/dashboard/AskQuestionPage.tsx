import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { SearchBar } from "../../components/ui/search-bar";
import { X } from "lucide-react";

const AskQuestionPage: React.FC = () => {

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { user } = useUser();

  const toggleSearchBar = () => setIsSearchOpen(!isSearchOpen);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Ask a Question</h1>
        <button
          onClick={toggleSearchBar}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Open Search
        </button>


      </div>
    </div>
  );
};

export default AskQuestionPage;
