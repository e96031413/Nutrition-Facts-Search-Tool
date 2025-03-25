import React, { useState, useEffect } from 'react';
import NutritionCard from './components/NutritionCard';
import SearchBar from './components/SearchBar';
import ApiConfig from './components/ApiConfig';
import { FoodItem } from './types';
import { searchFood } from './services/api';
import { Loader2, Cookie, BookDown as Bowl } from 'lucide-react';
import { config } from './config/env';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || config.API_KEY);
  const [bgPattern, setBgPattern] = useState<number>(1);

  // 預設範例食物資訊
  const defaultFood: FoodItem = {
    name: "白米飯",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    icon: Bowl,
    imageUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80",
    tips: "白米飯是主要的碳水化合物來源，建議搭配蔬菜食用。",
    description: "白米飯是華人飲食的主食，熱量為130卡路里。"
  };

  const handleApiConfigSave = (newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem('apiKey', newApiKey);
    setSelectedFood(null);
    setError(null);
    setSearchTerm('');
  };

  useEffect(() => {
    const fetchFood = async () => {
      if (searchTerm.length < 2) {
        setSelectedFood(null);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await searchFood(searchTerm, apiKey);
        if (result) {
          setSelectedFood(result);
        } else {
          setError('找不到相關食物資訊');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('搜尋時發生錯誤，請稍後再試');
        }
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchFood, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, apiKey]);

  return (
    <div className={`min-h-screen bg-pattern-${bgPattern} transition-all duration-500`}>
      <div className="absolute top-4 right-4 flex gap-2">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setBgPattern(num)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              bgPattern === num 
                ? 'border-amber-500 scale-110' 
                : 'border-gray-300 hover:border-amber-300'
            }`}
          >
            <span className="sr-only">背景樣式 {num}</span>
          </button>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-serif text-center mb-12">
          <span className="block text-sm font-sans uppercase tracking-widest text-amber-700 mb-2">營養指南</span>
          美食搜尋
        </h1>

        <ApiConfig
          onSave={handleApiConfigSave}
          currentApiKey={apiKey}
        />
        
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          disabled={loading || !apiKey}
        />

        <div className="mt-12">
          {loading && (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin text-amber-600" size={32} />
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 bg-white/80 p-4 rounded-lg backdrop-blur-sm">
              {error}
            </div>
          )}

          {!loading && !error && selectedFood && (
            <>
              <div className="mb-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-serif mb-4">{selectedFood.description}</h2>
              </div>
              <NutritionCard {...selectedFood} />
            </>
          )}

          {!loading && !error && !selectedFood && (
            <NutritionCard {...defaultFood} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;