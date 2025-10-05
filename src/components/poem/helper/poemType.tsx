import { Text } from "@/src/components/text";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
interface IPoemTypeProps {
  isVideo: boolean;
  isAudio: boolean;
}
export const PoemType: React.FC<IPoemTypeProps> = ({ isAudio, isVideo }) => {
  const iconName: any = isVideo ? "video" : isAudio ? "music" : "";
  const title = isVideo ? "Video" : isAudio ? "Audio" : "";
  if (!isAudio && !isVideo) return null;
  return (
    <View className="flex flex-row gap-2 items-center">
      <Feather
        name={iconName}
        size={14}
        className="dark:text-darkTextColor text-ligtTextColor"
      />
      <Text className="text-xss font-normal">{title}</Text>
    </View>
  );
};
