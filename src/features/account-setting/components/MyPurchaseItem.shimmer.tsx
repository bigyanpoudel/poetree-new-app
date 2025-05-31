import React from "react";
import { View } from "react-native";

export const MyPurchaseItemShimmer: React.FC = () => {
  return (
    <View className="flex flex-col p-4 px-5 gap-3 dark:bg-darker-100 bg-white/90">
      {/* Header with Playlist Info */}
      <View className="flex flex-row items-start mb-3">
        <View className="flex-1">
          <View className="flex flex-row items-center gap-3">
            {/* Avatar shimmer */}
            <View className="w-[50px] h-[50px] rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <View className="flex-1">
              {/* Title shimmer */}
              <View className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md mb-2 w-3/4 animate-pulse" />
              {/* Subtitle shimmer */}
              <View className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-1/2 animate-pulse" />
            </View>
          </View>
        </View>
        
        {/* Status chip shimmer */}
        <View className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
      </View>

      {/* Purchase Details */}
      <View className="flex flex-row justify-between items-center mb-3">
        <View>
          {/* Amount label shimmer */}
          <View className="h-3 bg-gray-300 dark:bg-gray-700 rounded-md mb-1 w-12 animate-pulse" />
          {/* Amount value shimmer */}
          <View className="h-5 bg-gray-300 dark:bg-gray-700 rounded-md w-16 animate-pulse" />
        </View>
        <View>
          {/* Date label shimmer */}
          <View className="h-3 bg-gray-300 dark:bg-gray-700 rounded-md mb-1 w-20 animate-pulse" />
          {/* Date value shimmer */}
          <View className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-24 animate-pulse" />
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex flex-row gap-3">
        {/* View button shimmer */}
        <View className="flex-1 h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
        
        {/* Download button shimmer */}
        <View className="flex-1 h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
      </View>
    </View>
  );
};