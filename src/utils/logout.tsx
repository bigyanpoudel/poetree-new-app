import { storageUtil } from "./storage";
import { POETREE_USER } from "./constant/appConstant";
import { queryClient } from "../lib/reactQuery";
import { router } from "expo-router";

// Global logout utility function
export const performLogout = async (setUser?: (user: any) => void) => {
  try {
    // Clear user from storage
    await storageUtil.clearItem(POETREE_USER);
    
    // Clear user from app state if setUser function is provided
    if (setUser) {
      setUser(null);
    }
    
    // Clear all cached queries
    queryClient.clear();
    
    // Navigate to home (only if router is available)
    try {
      router.replace("/");
    } catch (navError) {
      console.warn("Navigation error during logout:", navError);
    }
    
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};