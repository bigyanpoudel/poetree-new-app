import React from "react";
import { View } from "react-native";

export const Shimmer = ({ className }: { className: string }) => {
  return (
    <View
      className={`bg-gray-300/30 dark:bg-gray-700/50 animate-pulse rounded ${className}`}
    />
  );
};

export const PoemDetailShimmer = () => {
  return (
    <View className="flex-1 w-full h-full p-4 ">
      <View className="flex flex-col gap-10">
        {/* Header */}
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row gap-3 items-center">
            <Shimmer className="w-12 h-12 rounded-full" />
            <View className="flex flex-col gap-1">
              <Shimmer className="w-24 h-4 rounded" />
              <Shimmer className="w-16 h-3 rounded" />
            </View>
          </View>
          <Shimmer className="w-16 h-8 rounded-md" />
        </View>

        {/* Title */}
        <Shimmer className="w-full h-8 rounded" />

        {/* Body */}
        <View className="flex flex-col gap-4 mt-2">
          <Shimmer className="w-full h-8 rounded" />
          <Shimmer className="w-[90%] h-8 rounded" />
          <Shimmer className="w-[80%] h-8 rounded" />
          <Shimmer className="w-[85%] h-8 rounded" />
          <Shimmer className="w-[75%] h-8 rounded" />
          <Shimmer className="w-[95%] h-8 rounded" />
        </View>
      </View>
    </View>
  );
};
