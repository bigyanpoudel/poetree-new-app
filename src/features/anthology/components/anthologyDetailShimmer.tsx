import React from "react";
import { View } from "react-native";

export const AnthologyDetailShimmer = () => {
  return (
    <View className="flex-1">
      {/* Hero Image Shimmer */}
      <View className="relative">
        <View className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <View className="absolute top-4 right-4">
          <View className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
        </View>
      </View>

      {/* Content Shimmer */}
      <View className="p-6">
        {/* Title Shimmer */}
        <View className="w-3/4 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
        
        {/* Theme Shimmer */}
        <View className="w-1/2 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />

        {/* Details Section Shimmer */}
        <View className="mb-6">
          <View className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
          
          <View className="space-y-3">
            {/* Detail Row Shimmer */}
            {[...Array(4)].map((_, i) => (
              <View key={i} className="flex-row justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <View className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <View className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons Shimmer */}
        <View className="space-y-3">
          <View className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <View className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </View>
      </View>
    </View>
  );
};