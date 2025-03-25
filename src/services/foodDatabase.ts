import { Apple, Banana, Beef, Carrot, Coffee, Cookie, Egg, Fish, Grape, Milk, Pizza, Sandwich, Salad, BookDown as Bowl, Soup, Heading as Bread, Cherry, Diamond as Lemon, Tangent as Orange, Cake, IceCream, Croissant } from 'lucide-react';

interface FoodData {
  chinese: string[];  // 支援多個中文名稱
  english: string;
  category: string;
  subcategory?: string;
  icon: any;  // Lucide icon component
}

export const foodDatabase: FoodData[] = [
  // 主食類
  {
    chinese: ['白米飯', '白飯', '米飯', '飯'],
    english: 'rice',
    category: '主食',
    subcategory: '米飯類',
    icon: Bowl
  },
  {
    chinese: ['三明治', '吐司', '土司'],
    english: 'sandwich',
    category: '主食',
    icon: Sandwich
  },
  {
    chinese: ['麵包', '麵包片'],
    english: 'bread',
    category: '主食',
    icon: Bread
  },
  {
    chinese: ['可頌', '可頌麵包', '牛角麵包'],
    english: 'croissant',
    category: '主食',
    icon: Croissant
  },

  // 水果類
  {
    chinese: ['蘋果', '青蘋果', '紅蘋果'],
    english: 'apple',
    category: '水果',
    icon: Apple
  },
  {
    chinese: ['香蕉', '芭蕉'],
    english: 'banana',
    category: '水果',
    icon: Banana
  },
  {
    chinese: ['葡萄', '提子'],
    english: 'grape',
    category: '水果',
    icon: Grape
  },
  {
    chinese: ['櫻桃', '車厘子'],
    english: 'cherry',
    category: '水果',
    icon: Cherry
  },
  {
    chinese: ['檸檬'],
    english: 'lemon',
    category: '水果',
    icon: Lemon
  },
  {
    chinese: ['橙子', '柳橙', '橘子'],
    english: 'orange',
    category: '水果',
    icon: Orange
  },

  // 肉類
  {
    chinese: ['牛肉', '牛排', '牛腩', '牛肉片', '牛肉絲'],
    english: 'beef',
    category: '肉類',
    icon: Beef
  },
  {
    chinese: ['雞肉', '雞胸肉', '雞腿肉', '雞翅', '雞胸'],
    english: 'chicken',
    category: '肉類',
    icon: Egg
  },
  {
    chinese: ['豬肉', '豬排', '豬腩肉', '豬肉片', '豬肉絲'],
    english: 'pork',
    category: '肉類',
    icon: Pizza
  },

  // 海鮮類
  {
    chinese: ['魚', '魚肉', '鮭魚', '鱈魚', '魚片', '魚排'],
    english: 'fish',
    category: '海鮮',
    icon: Fish
  },

  // 乳製品
  {
    chinese: ['牛奶', '鮮奶', '牛乳'],
    english: 'milk',
    category: '乳製品',
    icon: Milk
  },
  {
    chinese: ['冰淇淋', '雪糕', '冰激凌'],
    english: 'ice cream',
    category: '乳製品',
    icon: IceCream
  },

  // 蔬菜類
  {
    chinese: ['胡蘿蔔', '紅蘿蔔', '蘿蔔'],
    english: 'carrot',
    category: '蔬菜',
    icon: Carrot
  },
  {
    chinese: ['生菜', '萵苣', '沙拉', '沙律'],
    english: 'lettuce',
    category: '蔬菜',
    icon: Salad
  },

  // 飲料類
  {
    chinese: ['咖啡', '美式咖啡', '黑咖啡'],
    english: 'coffee',
    category: '飲料',
    icon: Coffee
  },

  // 點心類
  {
    chinese: ['蛋糕', '蛋糕片', '蛋糕捲'],
    english: 'cake',
    category: '點心',
    icon: Cake
  },
  {
    chinese: ['餅乾', '曲奇'],
    english: 'cookie',
    category: '點心',
    icon: Cookie
  }
];