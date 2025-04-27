import { Button, Text } from "@/src/components";
import { ActionMenu } from "@/src/components/actionMenu";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";

export const PoemHeader = () => {
  return (
    <View className="flex flex-col gap-3">
      <View className="flex flex-row gap-3 justify-between items-center">
        <View className="flex flex-row gap-3 items-center">
          <Avatar.Text
            size={40}
            label="XD"
            labelStyle={{
              fontSize: 16,
              color: "white",
            }}
            className="dark:bg-black/50 bg-darkBackground "
          />
          <View className="flex flex-col">
            <Text className="text-base font-bold">User Name</Text>
            <Text className="text-sm text-gray-500">2021-10-10</Text>
          </View>
        </View>
        <Button mode="contained">Follow</Button>
      </View>

      <Text
        fontWeight={600}
        className="text-[28px] garamond -tracking-[0.5px]  font-semibold "
      >
        Poem Title
      </Text>
    </View>
  );
};
