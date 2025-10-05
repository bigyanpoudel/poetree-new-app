import { Text } from "@/src/components/text";
import { IconButton } from "@/src/components/button/iconButton";
import { IPoemHasTag } from "@/src/types";
import { useRouter } from "expo-router";
import { ArrowUpRight, Hash } from "lucide-react-native";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

interface IHashtagItemProps {
  hashtag: IPoemHasTag;
  postsCount?: number;
}

export const HashtagItem: React.FC<IHashtagItemProps> = ({ 
  hashtag, 
  postsCount = 0 
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/search?query=${encodeURIComponent(`#${hashtag.name}`)}`);
  };

  return (
    <View className="border-ui-border h-[120px] dark:border-ui-border/20 flex flex-row gap-3 rounded-lg bg-white dark:bg-darker-100 p-4">
      {/* Icon Section */}
      <View className="w-[80px] bg-ui-border dark:bg-ui-border/10 flex items-center justify-center rounded-lg">
        <Hash size={32} className="text-primary dark:text-white" />
      </View>

      {/* Content Section */}
      <View className="flex flex-col justify-between flex-1">
        {/* Hashtag Name and Stats */}
        <View className="flex flex-col gap-1">
          <TouchableWithoutFeedback onPress={handlePress}>
            <Text
              className="text-lg font-semibold dark:text-white text-text-300"
              numberOfLines={2}
              ellipsizeMode="tail"
              fontWeight={600}
            >
              #{hashtag.name}
            </Text>
          </TouchableWithoutFeedback>
          
          <Text className="text-sm text-text-100 dark:text-text-100">
            {postsCount} {postsCount === 1 ? 'post' : 'posts'}
          </Text>
        </View>

        {/* Action Button */}
        <View className="flex flex-row justify-end">
          <IconButton
            icon={(props) => <ArrowUpRight {...props} size={18} />}
            mode="contained"
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};