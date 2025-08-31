import React from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import classnames from "classnames";

const Shimmer = ({ className }: { className: string }) => {
  return (
    <View
      className={`bg-gray-300/30 dark:bg-gray-700/50 animate-pulse rounded ${className}`}
    />
  );
};

export const AnthologyCardShimmer = ({ className }: { className?: string }) => {
  return (
       <View className={classnames("m-2 overflow-hidden rounded-md bg-white dark:bg-darker-100", className)}>
      {/* Image section with status badge */}
      <View className="relative">
        <Shimmer className="w-full h-48" />
        {/* Status badge shimmer */}
        <View className="absolute top-2 right-2">
          <Shimmer className="w-16 h-6 rounded-full" />
        </View>
      </View>
      
      {/* Content section */}
      <View className="p-4">
        {/* Title shimmer */}
        <Shimmer className="w-3/4 h-6 mb-2" />
        
        {/* Button shimmer */}
        <View className="mt-2">
          <Shimmer className="w-full h-10 rounded-md" />
        </View>
      </View>
    </View>
  );
};