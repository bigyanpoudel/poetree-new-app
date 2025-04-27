import { Button, Text } from "@/src/components";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";

export const UserItem = () => {
  return (
    <View>
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
            <Text className="text-base font-bold">@userid</Text>
            <Text className="text-sm text-gray-500">Full Name</Text>
          </View>
        </View>
        <Button mode="contained">Follow</Button>
      </View>
    </View>
  );
};
