import { Text } from "@/src/components/text";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { LikeActionMenu } from "./likeActionMenu";
import { IAppPoem } from "@/src/types";
import React from "react";
import { formatPoemNumber } from "@/src/utils/poem";
interface IPoemActionsProps {
  poem: IAppPoem;
}
export const PoemActions: React.FC<IPoemActionsProps> = ({ poem }) => {
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
          {formatPoemNumber(poem.viewsCount)}
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
