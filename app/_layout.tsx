import { useAppState } from "@/src/hooks/useAppState";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { useOnlineManager } from "@/src/hooks/useOnlineManager";
import { onAppStateChange, queryClient } from "@/src/lib/reactQuery";
import { AppProvider, useAppProvider } from "@/src/provider/appProvider";
import { PaperProvider } from "@/src/provider/paperProvider";
import "@/src/style/global.css";
import { Colors } from "@/src/utils/constant/colors";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Image } from "react-native";
import "react-native-reanimated";
import ToastManager from "toastify-react-native";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <React.Suspense fallback={<></>}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <AppBootStrap />
        </AppProvider>
      </QueryClientProvider>
    </React.Suspense>
  );
}

// Memoize toast styles to prevent recreation on every render
const useToastStyles = (isDark: boolean) => React.useMemo(() => ({
  success: {
    backgroundColor: isDark ? '#065f46' : '#10b981',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowOpacity: isDark ? 0 : 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: isDark ? 0 : 4,
    elevation: isDark ? 0 : 4,
  },
  error: {
    backgroundColor: isDark ? '#7f1d1d' : '#ef4444',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowOpacity: isDark ? 0 : 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: isDark ? 0 : 4,
    elevation: isDark ? 0 : 4,
  },
  warning: {
    backgroundColor: isDark ? '#78350f' : '#f59e0b',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowOpacity: isDark ? 0 : 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: isDark ? 0 : 4,
    elevation: isDark ? 0 : 4,
  },
  info: {
    backgroundColor: isDark ? '#1e3a8a' : '#3b82f6',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowOpacity: isDark ? 0 : 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: isDark ? 0 : 4,
    elevation: isDark ? 0 : 4,
  },
}), [isDark]);

const AppBootStrap = () => {
  // Load only essential fonts first, others can be loaded asynchronously
  const [loaded] = useFonts({
    Garamond: require("../assets/fonts/garamond.ttf"),
    Poximanova: require("../assets/fonts/proxima-nova-medium.ttf"),
    Poximanova400: require("../assets/fonts/proximanova_regular.ttf"),
  });
  
  // Load additional fonts asynchronously after initial render
  const [additionalLoaded] = useFonts({
    Poximanova600: require("../assets/fonts/proximanova_semibold.otf"),
    Poximanova700: require("../assets/fonts/proximanova_bold.otf"),
    Poximanova800: require("../assets/fonts/proximanova_extrabold.otf"),
  });
  
  const isDark = useIsDarkTheme();
  const toastStyles = useToastStyles(isDark);
  
  useOnlineManager();
  useAppState(onAppStateChange);
  const { isUserLoaded, hasSeenOnboarding, isOnboardingLoaded } = useAppProvider();
  useEffect(() => {
    if (loaded && isUserLoaded && isOnboardingLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isUserLoaded, isOnboardingLoaded]);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDark
            ? Colors.dark.scafoldColor
            : Colors.light.scafoldColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image 
          source={isDark 
            ? require('../assets/images/poetree_logo_white.png') 
            : require('../assets/images/poetree_logo.png')
          }
          style={{ 
            width: 200, 
            height: 200,
            resizeMode: 'contain'
          }}
        />
      </View>
    );
  }

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: isDark
            ? Colors.dark.scafoldColor
            : Colors.light.scafoldColor,
        }}
      >
        <Stack 
          screenOptions={{ headerShown: false }}
          initialRouteName={!hasSeenOnboarding ? "onboarding" : "(home)"}
        >
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="user/[id]" />
          <Stack.Screen name="poem/[id]" />
          <Stack.Screen name="signin" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="search" />
          <Stack.Screen name="create-poem" />
          <Stack.Screen name="playlist/[id]" />
          <Stack.Screen name="follower/[id]" />
          <Stack.Screen name="create-playlist" />
          <Stack.Screen name="forget-password" />
          <Stack.Screen name="account/edit-profile" />
          <Stack.Screen name="account/change-password" />
          <Stack.Screen name="account/payment-account" />
          <Stack.Screen name="my-purchase" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <ToastManager 
          theme={isDark ? 'dark' : 'light'}
          textStyle={{
            fontSize: 16,
            fontFamily: 'Poximanova',
            fontWeight: '500',
          }}
          style={toastStyles}
        />
      </View>
    </PaperProvider>
  );
};
