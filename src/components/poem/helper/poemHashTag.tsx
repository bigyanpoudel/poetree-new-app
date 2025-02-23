import { IPoemHasTag } from "@/src/types";
import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "@/src/components/text";
const HashtagButton = ({ item }: { item: IPoemHasTag }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      className="dark:border-ui-border/60 border-ui-border"
    >
      <Text className="dark:text-darkTextColor text-base font-medium text-ligtTextColor">
        #{item.name}
      </Text>
    </TouchableOpacity>
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
export const RenderHashTag = ({ hashtags }: { hashtags: IPoemHasTag[] }) => {
  return (
    <View className="flex flex-row gap-2 gap-y-4 flex-wrap">
      {hashtags.map((item) => (
        <HashtagButton key={item._id} item={item} />
      ))}
    </View>
  );
};
