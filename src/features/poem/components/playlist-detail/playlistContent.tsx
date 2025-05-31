import { Text } from "@/src/components";
import { AudioPlayer } from "@/src/components/audioPlayer";
import { PoemBody } from "@/src/components/poem/helper/poemBody";
import VideoScreen from "@/src/components/videoPlayer";
import { IAppPoem, POEMTYPE } from "@/src/types";
import { getPoemType } from "@/src/utils/poem";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
interface IPlaylistContentProps {
  number?: number;
  poem?: IAppPoem;
}
export const PlaylistContent: React.FC<IPlaylistContentProps> = ({
  number,
  poem,
}) => {
  const poemType: POEMTYPE = getPoemType({ ...poem });
  return (
    <View className="flex flex-col gap-4 mt-4  bg-white/90 dark:bg-darker-100 p-4 px-5">
      <View className="flex flex-row gap-3 rounded-md items-center ">
        <Avatar.Text
          size={24}
          label={number?.toString() || "1"}
          labelStyle={{
            fontSize: 14,
            color: "white",
          }}
          className="dark:bg-black/50 bg-darkBackground "
        />
        <View className="flex flex-col">
          <Text className="text-xl" fontWeight={700} numberOfLines={2}>
            {poem?.title}
          </Text>
        </View>
      </View>
      {poemType === POEMTYPE.video && poem?.video && (
        <VideoScreen url={poem.video} />
      )}
      {poemType === POEMTYPE.audio && poem?.audio && (
        <AudioPlayer uri={poem.audio} />
      )}
      {poem && <PoemBody poem={poem} maxLines={0} />}
    </View>
  );
};
