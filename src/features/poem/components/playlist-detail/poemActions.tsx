import { Text } from "@/src/components/text";
import { IAppPlayList } from "@/src/types";
import { formatPoemNumber } from "@/src/utils/poem";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { LikeActionMenu } from "./likeActionMenu";
interface IPoemActionsProps {
  poem: IAppPlayList;
}
export const PlaylistActions: React.FC<IPoemActionsProps> = ({ poem }) => {
  return (
    <View className="flex flex-row gap-3 items-center justify-between">
      <LikeActionMenu poem={poem} poemCount={poem.likeCount} />
      <View className="flex flex-row gap-2 items-center">
        <Feather
          name="message-square"
          size={20}
          className="dark:text-darkTextColor text-ligtTextColor"
        />
        <Text fontWeight={500} className="text-sm font-semibold">
          {formatPoemNumber(poem.commentCount)}
        </Text>
      </View>
      <View className="flex flex-row gap-2 items-center">
        <Feather
          name="eye"
          size={20}
          className="dark:text-darkTextColor text-ligtTextColor"
        />
        <Text fontWeight={500} className="text-sm font-semibold">
          {formatPoemNumber(0)}
        </Text>
      </View>
      <View className="flex flex-row gap-2 items-center">
        <Feather
          name="share-2"
          size={20}
          className="dark:text-darkTextColor text-ligtTextColor"
        />
        <Text className="text-sm font-semibold">Share</Text>
      </View>
    </View>
  );
};
