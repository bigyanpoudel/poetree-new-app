import React from "react";
import { View } from "react-native";

export const ShimmerHorizontalPlaylist = () => {
  return (
    <View
      className="w-full flex-1 h-[170px] flex flex-row gap-3 rounded-lg bg-white dark:bg-darker-100 border border-ui-border/20"
    >
      {/* Thumbnail Placeholder */}
      <View className="w-[180px] h-full bg-ui-border/30 dark:bg-ui-border/10 rounded-l-lg animate-pulse" />

      {/* Content Placeholder */}
      <View className="flex-1 py-3 pr-3 justify-between">
        <View className="gap-2">
          <View className="w-28 h-4 bg-ui-border/40 dark:bg-ui-border/20 rounded-md animate-pulse" />
          <View className="w-16 h-4 bg-ui-border/40 dark:bg-ui-border/20 rounded-md animate-pulse" />
        </View>

        <View className="flex-row gap-2 justify-end items-center">
          <View className="w-8 h-8 rounded-full bg-ui-border/30 animate-pulse" />
          <View className="w-8 h-8 rounded-full bg-ui-border/30 animate-pulse" />
        </View>
      </View>
    </View>
  );
};
