import React, { createContext, useContext, useEffect, useState } from "react";
import { POETREE_USER } from "../utils/constant/appConstant";
import { storageUtil } from "../utils/storage";
import { useQueryClient } from "@tanstack/react-query";
import { appQuery } from "../utils/constant/appQuery";
import { updateCachedToken } from "../lib/axios";

type User = {
  _id?: string;
  accessToken?: string;
  role?: string;
};

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isUserLoaded: boolean; // true once initial user load is complete
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
  isOnboardingLoaded: boolean;
};

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  isUserLoaded: false,
  hasSeenOnboarding: true,
  setHasSeenOnboarding: () => {},
  isOnboardingLoaded: false,
});

export const useAppProvider = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true);
  const [isOnboardingLoaded, setIsOnboardingLoaded] = useState(false);
  const queryClient = useQueryClient();

  // Custom setUser function that also updates cached token
  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    updateCachedToken(newUser?.accessToken || null);
  };
  useEffect(() => {
    const loadAppData = async () => {
      try {
        // Load both user data and onboarding status in parallel
        const [userData, onboardingStatus] = await Promise.all([
          storageUtil.getItem(POETREE_USER),
          storageUtil.getItem('hasSeenOnboarding')
        ]);
        
        if (userData) {
          setUserState(userData);
          // Update cached token for API requests
          updateCachedToken(userData.accessToken || null);
          // Defer query invalidation to avoid blocking startup
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: [appQuery.getCurrentUser],
            });
          }, 0);
        }

        setHasSeenOnboarding(onboardingStatus === true);
      } catch (err) {
        // Silently handle storage errors during startup
      } finally {
        setIsUserLoaded(true);
        setIsOnboardingLoaded(true);
      }
    };

    loadAppData();
  }, [queryClient]);

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      isUserLoaded, 
      hasSeenOnboarding, 
      setHasSeenOnboarding, 
      isOnboardingLoaded 
    }}>
      {children}
    </AppContext.Provider>
  );
};
