import { Text } from "@/src/components/text";
import { ReactionsModal } from "@/src/components/modal/reactionsModal";
import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity, Share, Alert, Image } from "react-native";
import { LikeActionMenu } from "./likeActionMenu";
import { IAppPoem } from "@/src/types";
import React from "react";
import { formatPoemNumber } from "@/src/utils/poem";
import * as Clipboard from "expo-clipboard";
import { Toast } from "toastify-react-native";
import { APPENV } from "@/src/config/env";
import { REACTION_IMAGE } from "@/src/utils/constant/appConstant";
interface IPoemActionsProps {
  poem: IAppPoem;
}
export const PoemActions: React.FC<IPoemActionsProps> = ({ poem }) => {
  const [reactionsModalVisible, setReactionsModalVisible] = React.useState(false);
  const handleShare = async () => {
    // Convert HTML to plain text for sharing
    const htmlToText = (html: string) => {
      return html
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .replace(/&nbsp;/g, " ") // Replace non-breaking spaces
        .replace(/&amp;/g, "&") // Replace HTML entities
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .trim();
    };

    const poemText = htmlToText(poem.body || "");

    // Limit poem text length for sharing (max 200 characters)
    const MAX_POEM_LENGTH = 200;
    const truncatedPoemText = poemText.length > MAX_POEM_LENGTH 
      ? `${poemText.substring(0, MAX_POEM_LENGTH)}...` 
      : poemText;

    const shareContent = {
      title: "Check out this poem on Poetree",
      message: `"${truncatedPoemText}"\n\nBy ${
        poem.postedBy?.name || "Anonymous"
      }\n\nShared via Poetree - Social Media for Poets\n${APPENV.WEBSITE_BASE_URL}`,
      url: `${APPENV.WEBSITE_BASE_URL}/poem/${poem.slug}`,
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
        "Unable to open share menu. Would you like to copy the poem to clipboard instead?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Copy to Clipboard",
            onPress: async () => {
              await Clipboard.setStringAsync(shareContent.message);
              Toast.success("Poem copied to clipboard!");
            },
          },
        ]
      );
    }
  };

  return (
    <>
      {/* Reaction Preview - shown when there are likes */}
      {poem.likeCount > 0 && (
        <TouchableOpacity
          onPress={() => setReactionsModalVisible(true)}
          className="flex flex-row items-center gap-2 py-2 active:opacity-70"
        >
          <View className="flex flex-row items-center -space-x-2">
            {/* Show first 3 reaction types as preview */}
            {Object.keys(REACTION_IMAGE)
              .slice(0, 3)
              .map((type, index) => (
                <View
                  key={type}
                  style={{
                    marginLeft: index > 0 ? -8 : 0,
                    zIndex: 3 - index,
                  }}
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-darker-100 bg-white dark:bg-darker-100 flex items-center justify-center"
                >
                  <Image
                    source={{ uri: REACTION_IMAGE[type] }}
                    className="w-4 h-4"
                  />
                </View>
              ))}
          </View>
          <Text className="text-sm font-medium text-gray-700 dark:text-secondary-0/80">
            {formatPoemNumber(poem.likeCount)}{" "}
            {poem.likeCount === 1 ? "reaction" : "reactions"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Action Buttons */}
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
      {poem._id && (
        <ReactionsModal
          visible={reactionsModalVisible}
          onClose={() => setReactionsModalVisible(false)}
          postId={poem._id}
        />
      )}
    </>
  );
};
