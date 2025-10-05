import { Text } from "@/src/components";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Avatar } from "react-native-paper";
interface IPoemItemProps {
  onPress: () => void;
  title: string;
  sn: number;
}
export const PoemItem: React.FC<IPoemItemProps> = ({ onPress, title, sn }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className="flex flex-row gap-3 rounded-md p-3 justify-between bg-darker-100">
        <View className="flex flex-row flex-1 gap-3">
          <Avatar.Text
            size={20}
            label={sn.toString()}
            labelStyle={{
              fontSize: 12,
              color: "white",
            }}
            className="dark:bg-black/50 bg-darkBackground "
          />
          <View className="flex flex-col w-[85%]">
            <Text className="text-base" numberOfLines={2}>
              {title}
            </Text>
          </View>
        </View>
        <Feather
          name="trash-2"
          size={20}
          className="dark:text-darkTextColor text-ligtTextColor"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
