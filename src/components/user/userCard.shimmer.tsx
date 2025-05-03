import React from "react";
import { View } from "react-native";
import { Text } from "../text";

export const UserProfileCardShimmer = () => {
  return (
    <View className="bg-white dark:bg-transparent p-3 rounded-md border border-ui-border dark:border-ui-border/20 flex flex-col gap-3 animate-pulse">
      {/* Avatar and Info */}
      <View className="flex flex-row gap-6 items-center">
        {/* Avatar placeholder */}
        <View className="w-[40px] h-[40px] rounded-full bg-gray-300 dark:bg-dark-200" />

        {/* Name and Stats */}
        <View className="flex flex-col gap-2 flex-1">
          {/* Name shimmer */}
          <View className="h-4 w-3/4 bg-gray-300 dark:bg-dark-200 rounded" />

          {/* Followers & Following */}
          <View className="flex flex-row gap-6">
            <View className="items-center gap-1">
              <Text className="text-sm font-normal dark:text-text-100">
                Followers
              </Text>
              <View className="h-3 w-8 bg-gray-300 dark:bg-dark-200 rounded" />
            </View>
            <View className="items-center gap-1">
              <Text className="text-sm font-normal dark:text-text-100">
                Following
              </Text>
              <View className="h-3 w-8 bg-gray-300 dark:bg-dark-200 rounded" />
            </View>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex flex-row gap-4">
        <View className="h-9 bg-gray-300 dark:bg-dark-200 rounded-md flex-1" />
        <View className="h-9 bg-gray-300 dark:bg-dark-200 rounded-md flex-1" />
      </View>
    </View>
  );
};
