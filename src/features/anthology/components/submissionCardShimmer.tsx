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

export const SubmissionCardShimmer = ({ className }: { className?: string }) => {
  return (
    <Card className={classnames("m-2 overflow-hidden bg-transparent", className)}>
      <View className="p-4">
        {/* Header with status */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Shimmer className="w-3/4 h-6 mb-1" />
            <Shimmer className="w-1/2 h-4" />
          </View>
          <Shimmer className="w-16 h-6 rounded-full ml-2" />
        </View>

        {/* Content preview */}
        <View className="mb-3">
          <Shimmer className="w-full h-4 mb-1" />
          <Shimmer className="w-5/6 h-4 mb-1" />
          <Shimmer className="w-4/5 h-4" />
        </View>

        {/* Footer info */}
        <View className="flex-row justify-between items-center">
          <Shimmer className="w-1/3 h-3" />
          <Shimmer className="w-1/4 h-3" />
        </View>
      </View>
    </Card>
  );
};