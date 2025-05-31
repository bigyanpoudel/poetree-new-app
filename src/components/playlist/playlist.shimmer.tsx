import React from "react";
import { View } from "react-native";

export const PlaylistCardShimmer: React.FC = () => {
  return (
    <View className="w-[260px]  bg-white dark:bg-darker-100">
      {/* Thumbnail Placeholder */}
      <View className="w-full h-[100px]  bg-ui-border dark:bg-ui-border/10 animate-pulse" />

      {/* Content Placeholder */}
      <View className="px-4 py-3 flex flex-col gap-2">
        {/* Title Placeholder */}
        <View className="flex flex-col gap-1">
          <View className="h-5 w-[80%] bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <View className="h-5 w-[60%] bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </View>

        {/* Price & Buttons Row */}
        <View className="flex flex-row justify-between items-center mt-2">
          {/* Price */}
          <View className="h-5 w-[60px] bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />

          {/* Action Buttons */}
          <View className="flex flex-row gap-2">
            <View className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
            <View className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
          </View>
        </View>
      </View>
    </View>
  );
};
