import AsyncStorage from "@react-native-async-storage/async-storage";

// Simple in-memory cache to reduce storage reads
const cache = new Map<string, any>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cacheTimestamps = new Map<string, number>();

export const storageUtil = {
  setItem: async (key: string, value: any) => {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      // Update cache immediately
      cache.set(key, value);
      cacheTimestamps.set(key, Date.now());
      return await AsyncStorage.setItem(key, stringValue);
    } catch (e) {
      return null;
    }
  },
  
  getItem: async (key: string) => {
    try {
      // Check cache first
      const cached = cache.get(key);
      const timestamp = cacheTimestamps.get(key);
      
      if (cached !== undefined && timestamp && (Date.now() - timestamp) < CACHE_TTL) {
        return cached;
      }
      
      // Fallback to AsyncStorage
      const jsonValue = await AsyncStorage.getItem(key);
      const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      
      // Update cache
      if (parsedValue !== null) {
        cache.set(key, parsedValue);
        cacheTimestamps.set(key, Date.now());
      }
      
      return parsedValue;
    } catch (e) {
      return null;
    }
  },
  
  clearItem: async (key: string) => { 
    try {
      // Remove from cache
      cache.delete(key);
      cacheTimestamps.delete(key);
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      return null;
    }
  },
  
  // Clear all cached items
  clearCache: () => {
    cache.clear();
    cacheTimestamps.clear();
  }
};
