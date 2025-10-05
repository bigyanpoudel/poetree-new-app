import React from "react";
import { View } from "react-native";

export const PoemShimmer = () => {
  return (
    <View className="flex flex-col p-4 px-5 gap-3 bg-white/90 dark:bg-darker-100 rounded-lg">
      {/* Title and subtitle */}
      <View className="gap-2">
        <View className="w-3/4 h-6 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
        <View className="w-1/3 h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
      </View>

      {/* Body line */}
      <View className="h-20 w-full rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />

      {/* Tags line */}
      <View className="w-1/2 h-5 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />

      {/* Thumbnail/image placeholder */}
      <View className="w-full h-[200px] rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse" />

      {/* User row */}
      <View className="flex flex-row items-center justify-between mt-3">
        <View className="flex flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
          <View className="flex flex-col gap-1">
            <View className="w-24 h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <View className="w-16 h-3 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
          </View>
        </View>
        {/* Menu icon placeholder */}
        <View className="w-6 h-6 rounded bg-gray-300 dark:bg-gray-700 animate-pulse" />
      </View>
    </View>
  );
};
