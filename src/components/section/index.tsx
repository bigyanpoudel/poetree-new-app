import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { Button } from "../button";
import { Text } from "../text";
interface ISectionHeadingProps {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
}
export const SectionHeading: React.FC<ISectionHeadingProps> = ({
  onPress,
  title,
}) => {
  return (
    <View className="flex flex-row bg-white dark:bg-white/5 justify-between px-5 py-1 items-center">
      <Text className="text-lg font-bold">{title}</Text>
      <Button onPress={onPress} className="py-0">
        View All
      </Button>
    </View>
  );
};
