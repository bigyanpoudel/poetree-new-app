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
import { View } from "react-native";
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

const AppBootStrap = () => {
  const [loaded] = useFonts({
    Garamond: require("../assets/fonts/garamond.ttf"),
    Poximanova: require("../assets/fonts/proxima-nova-medium.ttf"),
    Poximanova400: require("../assets/fonts/proximanova_regular.ttf"),
    Poximanova600: require("../assets/fonts/proximanova_semibold.otf"),
    Poximanova700: require("../assets/fonts/proximanova_bold.otf"),
    Poximanova800: require("../assets/fonts/proximanova_extrabold.otf"),
  });
  const isDark = useIsDarkTheme();
  useOnlineManager();
  useAppState(onAppStateChange);
  const { isUserLoaded } = useAppProvider();
  console.log("isUserLoaded", isUserLoaded);
  useEffect(() => {
    if (loaded && isUserLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isUserLoaded]);

  if (!loaded) {
    return null;
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
        <Stack screenOptions={{ headerShown: false }}>
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
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <ToastManager />
      </View>
    </PaperProvider>
  );
};
