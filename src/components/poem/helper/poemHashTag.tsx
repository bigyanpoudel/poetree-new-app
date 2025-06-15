import { IPoemHasTag } from "@/src/types";
import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "@/src/components/text";
import classNames from "classnames";
import { useRouter } from "expo-router";
export const HashtagButton = ({
  title,
  onPress,
  className,
  icon,
}: {
  title: string;
  onPress?: () => void;
  className?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      className={classNames(
        "dark:border-ui-border/60 border-ui-border",
        className
      )}
    >
      <Text className="dark:text-darkTextColor text-base font-medium text-ligtTextColor">
        #{title}
      </Text>
      {icon && icon}
    </TouchableOpacity>
  );
};

export const HashtagButtonShimmer = ({ className }: { className?: string }) => {
  return (
    <View
      className={`flex-row items-center rounded-full px-4 py-2 border animate-pulse bg-gray-200 dark:bg-dark-200 dark:border-ui-border/60 border-ui-border ${className}`}
    >
      {/* Shimmer for text */}
      <View className="h-4 w-20 bg-gray-300 dark:bg-dark-300 rounded" />

      {/* Optional icon shimmer (if you want to simulate an icon) */}
      <View className="ml-2 h-4 w-4 bg-gray-300 dark:bg-dark-300 rounded-full" />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "transparent",
    shadowOpacity: 0,
    padding: 4,
    paddingHorizontal: 6,
  },
});

// Example usage
export const RenderHashTag = ({
  hashtags,
  title,
}: {
  hashtags: IPoemHasTag[];
  title: string;
}) => {
  const router = useRouter();

  const handleHashtagPress = (hashtagName: string) => {
    router.push(`/search?query=${encodeURIComponent(`#${hashtagName}`)}`);
  };

  return (
    <View className="flex my-2 flex-row gap-2 gap-y-4 flex-wrap">
      {hashtags.map((item, index) => (
        <HashtagButton
          key={item._id + `${index} - ${title}`}
          title={item.name}
          onPress={() => handleHashtagPress(item.name)}
        />
      ))}
    </View>
  );
};
