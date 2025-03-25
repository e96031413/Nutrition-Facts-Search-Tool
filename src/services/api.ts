import axios from 'axios';
import { FoodItem } from '../types';
import { foodDatabase } from './foodDatabase';
import { Cookie } from 'lucide-react';
import { getRandomFoodImage } from './unsplash';

export const searchFood = async (query: string, apiKey: string): Promise<FoodItem | null> => {
  try {
    if (!apiKey) {
      throw new Error('API 金鑰未設定');
    }

    // 轉換繁體中文到英文，支援模糊搜尋
    const searchQuery = query.toLowerCase().trim();
    let matchedFood = null;
    let bestMatchScore = 0;
    
    // 尋找最佳匹配
    for (const food of foodDatabase) {
      for (const chineseName of food.chinese) {
        const currentName = chineseName.toLowerCase();
        // 完全匹配
        if (currentName === searchQuery) {
          matchedFood = food;
          bestMatchScore = 1;
          break;
        }
        // 部分匹配，計算匹配度
        if (currentName.includes(searchQuery) || searchQuery.includes(currentName)) {
          const matchLength = Math.min(currentName.length, searchQuery.length);
          const score = matchLength / Math.max(currentName.length, searchQuery.length);
          if (score > bestMatchScore) {
            matchedFood = food;
            bestMatchScore = score;
          }
        }
      }
      if (bestMatchScore === 1) break; // 如果找到完全匹配就停止搜尋
    }

    // 如果找不到對應的英文翻譯，但輸入的是中文
    if (!matchedFood && /[\u4e00-\u9fff]/.test(query)) {
      throw new Error('很抱歉，目前不支援這個食物的搜尋。請嘗試其他常見食物，例如：白飯、蘋果、牛肉、雞肉等。');
    }

    const response = await axios.get(
      'https://api.calorieninjas.com/v1/nutrition',
      {
        params: { query: matchedFood ? matchedFood.english : query },
        headers: {
          'X-Api-Key': apiKey
        }
      }
    );

    if (response.data.items && response.data.items.length > 0) {
      const food = response.data.items[0];
      const displayName = matchedFood ? matchedFood.chinese[0] : food.name;
      
      // 如果是白米飯，使用固定圖片
      const imageUrl = matchedFood?.english === 'rice' 
        ? 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80'
        : await getRandomFoodImage(matchedFood ? matchedFood.english : food.name);
      
      return {
        name: displayName,
        calories: Math.round(food.calories || 0),
        protein: Math.round(food.protein_g || 0),
        carbs: Math.round(food.carbohydrates_total_g || 0),
        fat: Math.round(food.fat_total_g || 0),
        icon: matchedFood ? matchedFood.icon : Cookie,
        imageUrl,
        tips: `這份${displayName}含有 ${Math.round(food.protein_g || 0)}g 蛋白質，${Math.round(food.carbohydrates_total_g || 0)}g 碳水化合物，以及 ${Math.round(food.fat_total_g || 0)}g 脂肪。${food.fiber_g > 0 ? `富含 ${food.fiber_g}g 膳食纖維。` : ''}`,
        description: `${displayName} 的熱量為 ${Math.round(food.calories || 0)} 卡路里，每份量 ${food.serving_size_g}g。`
      };
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('API 金鑰無效');
      }
      throw new Error(`搜尋失敗: ${error.message}`);
    }
    throw error;
  }
};