import React from 'react';
import { Circle, Leaf, Droplets, Wheat } from 'lucide-react';
import { FoodItem } from '../types';

const NutritionCard: React.FC<FoodItem> = ({
  name,
  calories,
  protein,
  carbs,
  fat,
  icon: FoodIcon,
  imageUrl,
  tips
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
        <div className="relative h-48">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <FoodIcon size={96} className="text-gray-600" />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="text-xs uppercase tracking-widest text-white bg-black/50 px-3 py-1 rounded-full">
              營養資訊
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-light text-gray-900">{name}</h2>
              <p className="text-sm uppercase tracking-wider text-gray-500">營養資訊</p>
            </div>
            <div className="text-right">
              <span className="block text-3xl font-bold text-gray-900">{calories}</span>
              <span className="text-sm text-gray-500">卡路里</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Wheat className="w-4 h-4 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{carbs}g</p>
                <p className="text-xs text-gray-500">碳水化合物</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{protein}g</p>
                <p className="text-xs text-gray-500">蛋白質</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{fat}g</p>
                <p className="text-xs text-gray-500">脂肪</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-start gap-2">
              <Leaf className="w-4 h-4 text-green-600 mt-1" />
              <p className="text-sm text-gray-600 italic">{tips}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;