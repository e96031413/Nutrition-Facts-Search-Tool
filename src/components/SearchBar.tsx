import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, disabled }) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜尋食物（例如：蘋果、雞肉、米飯）"
          className={`w-full px-6 py-4 pr-12 text-lg bg-white border-none rounded-xl shadow-md focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all duration-300 ${
            disabled ? 'opacity-70' : ''
          }`}
          disabled={disabled}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {disabled ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <Search size={24} />
          )}
        </div>
      </div>
      <div className="absolute -bottom-6 left-0 right-0 text-center">
        <p className="text-sm text-gray-500">請在上方搜尋欄輸入食物名稱來查詢營養資訊</p>
      </div>
    </div>
  );
};

export default SearchBar;