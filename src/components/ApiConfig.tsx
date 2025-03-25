import React, { useState } from 'react';
import { Key, Settings2, Image } from 'lucide-react';

interface ApiConfigProps {
  onSave: (apiKey: string) => void;
  currentApiKey: string;
}

const ApiConfig: React.FC<ApiConfigProps> = ({ onSave, currentApiKey }) => {
  const [calorieNinjasKey, setCalorieNinjasKey] = useState(currentApiKey);
  const [unsplashKey, setUnsplashKey] = useState(localStorage.getItem('unsplashKey') || import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(calorieNinjasKey);
    localStorage.setItem('unsplashKey', unsplashKey);
    window.location.reload(); // 重新載入頁面以套用新的 Unsplash API 金鑰
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        title="API 設定"
      >
        <Settings2 size={24} className="text-gray-600" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">API 設定</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Key size={16} />
                CalorieNinjas API 金鑰
              </div>
            </label>
            <input
              type="password"
              value={calorieNinjasKey}
              onChange={(e) => setCalorieNinjasKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="輸入 CalorieNinjas API 金鑰"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Image size={16} />
                Unsplash API 金鑰
              </div>
            </label>
            <input
              type="password"
              value={unsplashKey}
              onChange={(e) => setUnsplashKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="輸入 Unsplash API 金鑰"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              取消
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              儲存
            </button>
          </div>
        </form>
        
        <div className="mt-4 space-y-2 text-xs text-gray-500">
          <div>
            <a 
              href="https://calorieninjas.com/api" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              註冊 CalorieNinjas API 金鑰
            </a>
            {' '}(每月 50,000 次免費額度)
          </div>
          <div>
            <a 
              href="https://unsplash.com/developers" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              註冊 Unsplash API 金鑰
            </a>
            {' '}(每小時 50 次免費請求)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiConfig;