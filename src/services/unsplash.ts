import { createApi } from 'unsplash-js';

const getUnsplashKey = () => {
  return localStorage.getItem('unsplashKey') || import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';
};

const createUnsplashApi = () => {
  return createApi({
    accessKey: getUnsplashKey(),
  });
};

export const getRandomFoodImage = async (query: string): Promise<string> => {
  try {
    const unsplash = createUnsplashApi();
    const result = await unsplash.photos.getRandom({
      query: `${query} food`,
      orientation: 'landscape',
      count: 1,
    });

    if (result.type === 'success' && Array.isArray(result.response)) {
      return result.response[0].urls.regular;
    } else if (result.type === 'success') {
      return result.response.urls.regular;
    }
    
    // 如果找不到特定食物的圖片，返回一個通用的美食圖片
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80';
  } catch (error) {
    console.error('Failed to fetch Unsplash image:', error);
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80';
  }
};