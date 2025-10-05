import { MainAppBar } from "@/src/components/appbar/mainAppBar";
import { Button } from "@/src/components";
import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import { HomeYourFeed } from "@/src/features/home/routes/yourFeed";
import { useAppProvider } from "@/src/provider/appProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, useColorScheme } from "react-native";

export default function FeedScreen() {
  const { user } = useAppProvider();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Show login prompt for unauthenticated users
  if (!user?._id) {
    return (
      <ScreenLayout
        appBar={{
          title: "Feed",
        }}
      >
        <View className="flex-1 justify-center items-center ">
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mb-6">
              <MaterialIcons
                name="rss-feed"
                size={40}
                color={isDark ? "#60A5FA" : "#2563EB"}
              />
            </View>

            <Text className="text-2xl font-bold text-center mb-4 dark:text-white">
              Login Required
            </Text>

            <Text className="text-center text-gray-600 dark:text-gray-400 text-base leading-6 mb-8">
              The Feed feature is only available for authenticated users. Please
              sign in to see personalized content from poets you follow.
            </Text>
          </View>

          <View className="w-full flex flex-col gap-4">
            <Button
              mode="contained"
              onPress={() => router.push("/signin")}
              contentStyle={{
                height: 48,
              }}
              labelStyle={{
                fontWeight: "700",
                fontSize: 16,
              }}
              className="w-full"
            >
              Sign In
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push("/signup")}
              contentStyle={{
                height: 48,
              }}
              labelStyle={{
                fontWeight: "600",
                fontSize: 16,
              }}
              className="w-full"
            >
              Create Account
            </Button>
          </View>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <React.Fragment>
      <MainAppBar />
      <HomeYourFeed />
    </React.Fragment>
  );
}
