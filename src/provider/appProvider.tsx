import React, { createContext, useContext, useEffect, useState } from "react";
import { POETREE_USER } from "../utils/constant/appConstant";
import { storageUtil } from "../utils/storage";
import { useQueryClient } from "@tanstack/react-query";
import { appQuery } from "../utils/constant/appQuery";

type User = {
  _id?: string;
  accessToken?: string;
  role?: string;
};

type AppContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true);
  const [isOnboardingLoaded, setIsOnboardingLoaded] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    const loadAppData = async () => {
      try {
        // Load user data
        const userData = await storageUtil.getItem(POETREE_USER);
        if (userData) {
          await queryClient.invalidateQueries({
           queryKey: [appQuery.getCurrentUser],
         });
          setUser(userData);
        }

        // Load onboarding status
        const onboardingStatus = await storageUtil.getItem('hasSeenOnboarding');
        setHasSeenOnboarding(onboardingStatus === true);
      } catch (err) {
        console.warn("Failed to load app data from storage", err);
      } finally {
        setIsUserLoaded(true);
        setIsOnboardingLoaded(true);
      }
    };

    loadAppData();
  }, []);

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
