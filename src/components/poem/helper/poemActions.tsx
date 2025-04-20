import { TouchableOpacity, View } from "react-native";
import { Button } from "../../button";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/src/components/text";
import { Tooltip } from "react-native-paper";
import { LikeActionMenu } from "./likeActionMenu";
export const PoemActions = () => {
  return (
    <View className="flex flex-row gap-3 items-center justify-between">
      <LikeActionMenu onHandleReaction={() => {}} />
      <View className="flex flex-row gap-2 items-center">
        <Feather
          name="message-square"
          size={20}
          className="dark:text-darkTextColor text-ligtTextColor"
        />
        <Text fontWeight={500} className="text-sm font-semibold">
          1232
        </Text>
      </View>
      <View className="flex flex-row gap-2 items-center">
        <Feather
          name="eye"
          size={20}
          className="dark:text-darkTextColor text-ligtTextColor"
        />
        <Text fontWeight={500} className="text-sm font-semibold">
          1232
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
