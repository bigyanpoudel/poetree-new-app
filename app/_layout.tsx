import { PaperProvider } from "@/src/provider/paperProvider";
import "@/src/style/global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Garamond: require("../assets/fonts/garamond.ttf"),
    Poximanova: require("../assets/fonts/proxima-nova-medium.ttf"),
    Poximanova400: require("../assets/fonts/proximanova_regular.ttf"),
    Poximanova600: require("../assets/fonts/proximanova_semibold.otf"),
    Poximanova700: require("../assets/fonts/proximanova_bold.otf"),
    Poximanova800: require("../assets/fonts/proximanova_extrabold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="user/profile" />
        <Stack.Screen name="poem/[id]" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="search" />
        <Stack.Screen name="create-poem" />
        <Stack.Screen name="playlist/[id]" />
        <Stack.Screen name="create-playlist" />
        <Stack.Screen name="forget-password" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
