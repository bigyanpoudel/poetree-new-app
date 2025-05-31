import { APPICONS } from "@/assets/icons";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import React from "react";
import { View } from "react-native";
import { Text } from "../text";

export const PurchaseState = () => {
  const isDark = useIsDarkTheme();
  return (
    <View className="p-5 flex-col h-fit gap-0 items-center justify-center dark:bg-darker-100 bg-white/90 ">
      {isDark ? (
        <APPICONS.CardEmptyIcon color={"rgba(255,255,255,0.8)"} />
      ) : (
        <APPICONS.CardEmptyIcon color={"rgba(0,0,0,0.8)"} />
      )}
      <View className="flex flex-col items-center gap-2 justify-center">
        <Text className="text-xl" fontWeight={700}>
          Purchase to Access Full Playlist
        </Text>
        <Text className="text-base dark:text-white/80 text-ligtTextColor/80 text-center">
          You need to purchase this playlist to access all its poems. Once
          purchased, you'll be able to view and enjoy the full content without
          any restrictions.
        </Text>
      </View>
    </View>
  );
};
