import { Text } from "@/src/components/text";
import { IAppPlayList } from "@/src/types";
import { formatPoemNumber } from "@/src/utils/poem";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, Share, Alert } from "react-native";
import { LikeActionMenu } from "./likeActionMenu";
import * as Clipboard from "expo-clipboard";
import { Toast } from "toastify-react-native";
import { APPENV } from "@/src/config/env";
interface IPoemActionsProps {
  poem: IAppPlayList;
}
export const PlaylistActions: React.FC<IPoemActionsProps> = ({ poem }) => {
  const handleShare = async () => {
    const shareContent = {
      title: "Check out this playlist on Poetree",
      message: `🎵 "${poem.title}"\n\n By ${
        poem.createdBy?.name || "Anonymous"
      }\n\nShared via Poetree - Social Media for Poets\n${APPENV.WEBSITE_BASE_URL}`,
      url: `${APPENV.WEBSITE_BASE_URL}/playlist/${poem.slug}`,
    };

    try {
      const result = await Share.share({
        message: shareContent.message,
        title: shareContent.title,
        url: shareContent.url,
      });

      if (result.action === Share.dismissedAction) {
        // User dismissed the share dialog
      }
    } catch (error) {
      // If sharing fails, offer to copy to clipboard
      Alert.alert(
        "Share Failed",
        "Unable to open share menu. Would you like to copy the playlist to clipboard instead?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Copy to Clipboard",
            onPress: async () => {
              await Clipboard.setStringAsync(shareContent.message);
              Toast.success("Playlist copied to clipboard!");
            },
          },
        ]
      );
    }
  };

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
      <TouchableOpacity
        onPress={handleShare}
        className="flex flex-row gap-2 items-center"
      >
        <Feather
          name="share-2"
          size={20}
          className="dark:text-darkTextColor text-ligtTextColor"
        />
        <Text className="text-sm font-semibold">Share</Text>
      </TouchableOpacity>
    </View>
  );
};
