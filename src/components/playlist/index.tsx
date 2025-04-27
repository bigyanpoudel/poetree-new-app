import { getAccountFormatter } from "@/src/utils/currency";
import { useRouter } from "expo-router";
import { ArrowUpRight, Edit } from "lucide-react-native"; // For icons
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { IconButton } from "../button/iconButton";
import { Text } from "../text";
interface IPlaylistCardProps {
  style?: StyleProp<ViewStyle>;
}
export const PlaylistCard: React.FC<IPlaylistCardProps> = ({ style }) => {
  const router = useRouter();
  return (
    <View
      style={[
        {
          width: 260,
        },
        style,
      ]}
      className="border-ui-border dark:border-ui-border/20 rounded-lg bg-white dark:bg-darker-100"
    >
      {/* Thumbnail or Placeholder */}

      <View
        className={
          "w-full h-[100px] rounded-t-lg bg-ui-border dark:bg-ui-border/10 flex items-center justify-center"
        }
      >
        <Text className={"text-3xl text-center"}>A</Text>
      </View>

      {/* Card Content */}
      <View className={"px-4 py-3 flex flex-col gap-1 flex-1"}>
        {/* Title and Date */}
        <View className={"flex flex-col gap-1"}>
          <Text className={"text-xs dark:text-white/60 text-text-200"}>
            12 July 2024
          </Text>

          <Text
            className={"text-lg font-semibold dark:text-white text-text-300"}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            This is title
          </Text>
        </View>

        {/* Price and Action Button */}
        <View className={"flex flex-row gap-2 items-center justify-between"}>
          <Text
            className={"text-lg font-extrabold dark:text-white text-primary"}
          >
            {getAccountFormatter(0)}
          </Text>

          {/* Edit Button (Visible only to the owner) */}
          <View className="flex flex-row gap-0">
            <IconButton
              icon={(props) => <Edit {...props} size={18} />}
              mode="contained"
            />
            <IconButton
              onPress={() => {
                router.navigate("/playlist/1231");
              }}
              icon={(props) => <ArrowUpRight {...props} size={18} />}
              mode="contained"
            />
          </View>
        </View>
      </View>
    </View>
  );
};
