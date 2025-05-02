import AsyncStorage from "@react-native-async-storage/async-storage";
export const storageUtil = {
  setItem: async (key: string, value: string) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  },
  getItem: async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  },
  clearItem: async (key: string) => { 
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      return null;
    }
  }
};
