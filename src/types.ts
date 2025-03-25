import type { LucideIcon } from 'lucide-react';

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  icon: LucideIcon;
  imageUrl?: string;
  tips: string;
  description: string;
}