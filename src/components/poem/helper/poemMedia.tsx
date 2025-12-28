import React from "react";
import { View, Image } from "react-native";
import { Link } from "expo-router";
import { IAppPoem, POEMTYPE } from "@/src/types";
import { getPoemType } from "@/src/utils/poem";
import VideoScreen from "@/src/components/videoPlayer";
import { AudioPlayer } from "@/src/components/audioPlayer";
import { RenderHashTag } from "./poemHashTag";

interface IPoemMediaProps {
  poem: IAppPoem;
}

export const PoemMedia: React.FC<IPoemMediaProps> = ({ poem }) => {
  const poemType: POEMTYPE = getPoemType({ ...poem });

  return (
    <View className="my-4 flex flex-col gap-3">
      {poemType === POEMTYPE.image && poem.thumbnail && (
        <View className="max-h-[280px] w-full">
          <Image
            source={{
              uri: poem.thumbnail,
            }}
            className="h-full w-full object-contain"
          />
        </View>
      )}
      {poemType === POEMTYPE.video && poem.video && (
        <VideoScreen url={poem.video} />
      )}
      {poemType === POEMTYPE.audio && poem.audio && (
        <AudioPlayer uri={poem.audio} />
      )}
      {poem.hashTags && poem.hashTags.length > 0 && (
        <RenderHashTag hashtags={poem.hashTags} title={poem?._id ?? ""} />
      )}
    </View>
  );
};
