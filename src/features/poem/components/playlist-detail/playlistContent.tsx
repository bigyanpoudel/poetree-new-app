import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { Text } from "@/src/components";
import { PoemBody } from "@/src/components/poem/helper/poemBody";
import { POEMS } from "@/src/utils/constant/appConstant";
import VideoScreen from "@/src/components/videoPlayer";
export const PlaylistContent = () => {
  return (
    <View className="flex flex-col gap-4 mt-4  bg-white/90 dark:bg-darker-100 p-4 px-5">
      <View className="flex flex-row gap-3 rounded-md items-center ">
        <Avatar.Text
          size={24}
          label="1"
          labelStyle={{
            fontSize: 14,
            color: "white",
          }}
          className="dark:bg-black/50 bg-darkBackground "
        />
        <View className="flex flex-col">
          <Text className="text-xl" fontWeight={700} numberOfLines={2}>
            This is Poem Title
          </Text>
        </View>
      </View>
      <VideoScreen url="" />;
      <PoemBody poem={POEMS[0]} maxLines={0} />
    </View>
  );
};
