import { Button, Text } from "@/src/components";
import { PoemActions } from "@/src/components/poem/helper/poemActions";
import { getAccountFormatter } from "@/src/utils/currency";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";

export const PlaylistSection = () => {
  return (
    <View className="px-5 mt-4 flex flex-col gap-3 dark:bg-darker-100 bg-white py-3">
      <View className="flex flex-row gap-3 justify-between items-center">
        <Text className="text-xl font-bold">Playlist (100)</Text>
        <Button mode="contained">Purchase {getAccountFormatter(200)}</Button>
      </View>
      <View>
        <View className="flex flex-row flex-1 h-[31px]  items-center gap-3">
          <Avatar.Text
            size={24}
            label="1"
            labelStyle={{
              fontSize: 14,
              color: "white",
            }}
            className="dark:bg-black/50 bg-darkBackground "
          />

          <Text className="text-base" numberOfLines={2}>
            This is Poem Title
          </Text>
        </View>
      </View>
    </View>
  );
};
