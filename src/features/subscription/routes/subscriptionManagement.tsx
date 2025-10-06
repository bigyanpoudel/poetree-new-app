import React from "react";
import { ActivityIndicator, View } from "react-native";
import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { useGetCurrentUser } from "@/src/hooks/useRootHook";
import { Colors } from "@/src/utils/constant/colors";
import { useGetCurrentSubscription } from "../hooks/subscription";
import { NoSubscription } from "../components/NoSubscription";
import { ActiveSubscription } from "../components/ActiveSubscription";

export const SubscriptionManagementScreen = () => {
  const isDark = useIsDarkTheme();
  const currentUser = useGetCurrentUser();
  console.log("currentUser",currentUser);


  // Loading state
  if (currentUser.isLoading) {
    return (
      <ScreenLayout
        appBar={{
          title: "Subscription",
        }}
      >
        <View
          className="flex-1 justify-center items-center"
          style={{
            backgroundColor: isDark
              ? Colors.dark.scafoldColor
              : Colors.light.scafoldColor,
          }}
        >
          <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
          <Text className="mt-4" fontWeight={500}>
            Loading subscription details...
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  // No subscription or not subscribed
  if ( !currentUser?.data?.subscription?.isSubscribed) {
    return <NoSubscription />;
  }

  // Active subscription
  return <ActiveSubscription  />;
};
