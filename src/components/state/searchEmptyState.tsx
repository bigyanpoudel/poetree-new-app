import { APPICONS } from "@/assets/icons";
import React from "react";
import { View } from "react-native";
import { Text } from "../text";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
export const SearchEmptyState = () => {
  const isDark = useIsDarkTheme();
  return (
    <View className="p-5 flex-col gap-4 items-center justify-center dark:bg-darker-100 bg-white/90 ">
      {isDark ? (
        <APPICONS.EmptySearch color={"rgba(255,255,255,0.8)"} />
      ) : (
        <APPICONS.EmptySearch color={"rgba(0,0,0,0.8)"} />
      )}
      <View className="flex flex-col items-center gap-2 justify-center">
        <Text className="text-xl" fontWeight={700}>
          No results found
        </Text>
        <Text className="text-base dark:text-white/80 text-ligtTextColor/80 text-center">
          Try adjusting your search to find what you are looking for
        </Text>
      </View>
    </View>
  );
};
