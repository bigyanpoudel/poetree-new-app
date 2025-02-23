import React from "react";
import { View } from "react-native";
import { CommentItem } from "./helpers/commentItem";
import { CommentInputSection } from "./helpers/commentInputSection";

export const PoemCommentSections = () => {
  return (
    <View className="flex flex-col gap-4">
      <CommentInputSection />
      <CommentItem />
      <CommentItem />
    </View>
  );
};
