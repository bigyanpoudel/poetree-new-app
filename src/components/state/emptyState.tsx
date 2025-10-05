import { APPICONS } from "@/assets/icons";
import React from "react";
import { View } from "react-native";
import { Text } from "../text";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";

export const EmptyState = () => {
  const isDark = useIsDarkTheme();
  return (
    <View className="p-5 flex-col gap-4 items-center justify-center dark:bg-darker-100 bg-white/90 ">
      {isDark ? (
        <APPICONS.EmptyDataIcon color={"rgba(255,255,255,0.8)"} />
      ) : (
        <APPICONS.EmptyDataIcon color={"rgba(0,0,0,0.8)"} />
      )}
      <View className="flex flex-col items-center gap-2 justify-center">
        <Text className="text-xl" fontWeight={700}>
          No Data Found
        </Text>
        <Text className="text-base dark:text-white/80 text-ligtTextColor/80 text-center">
          We couldn't find any information to display right now. Please check
          back later or try refreshing the page.
        </Text>
      </View>
    </View>
  );
};
