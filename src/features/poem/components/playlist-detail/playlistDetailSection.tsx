import React from "react";
import { View } from "react-native";
import { PoemHeader } from "../poem-details/poem-header";
import { Avatar } from "react-native-paper";
import { Button, Text } from "@/src/components";
import { PoemActions } from "@/src/components/poem/helper/poemActions";

export const PlaylistDetailSection = () => {
  return (
    <View className="px-5 mt-4 flex flex-col gap-3 dark:bg-darker-100 bg-white py-3">
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

        <Text fontWeight={600} className="text-2xl">
          Poem Title
        </Text>
      </View>
      <PoemActions />
    </View>
  );
};
