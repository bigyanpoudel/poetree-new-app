import { useAppProvider } from "@/src/provider/appProvider";
import { IAppPlayList } from "@/src/types";
import { getAccountFormatter } from "@/src/utils/currency";
import { Link, useRouter } from "expo-router";
import { ArrowUpRight, Edit } from "lucide-react-native"; // For icons
import React from "react";
import {
    Image,
    StyleProp,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native";
import { IconButton } from "../button/iconButton";
import { Text } from "../text";
interface IPlaylistCardProps {
  style?: StyleProp<ViewStyle>;
  playlist: IAppPlayList;
}
export const HorizontalPlaylist: React.FC<IPlaylistCardProps> = ({
  style = {},
  playlist,
}) => {
  const router = useRouter();
  const { user } = useAppProvider();
  return (
    <View className="border-ui-border h-[170px] dark:border-ui-border/20 flex flex-row gap-3 rounded-lg bg-white dark:bg-darker-100">
      {/* Thumbnail or Placeholder */}

      <View
        className={
          "w-[180px]  bg-ui-border dark:bg-ui-border/10 flex items-center justify-center"
        }
      >
        {playlist.thumbnail ? (
          <Image
            source={{
              uri: playlist.thumbnail,
            }}
            className="h-full w-full object-cover"
          />
        ) : (
          <Text className={"text-3xl text-center"}>
            {playlist.title?.charAt(0)}
          </Text>
        )}
      </View>

      {/* Card Content */}
      <View
        className={
          "px-4 py-3 w-[60px] flex flex-col gap-1 w-f justify-between flex-1"
        }
      >
        {/* Title and Date */}
        <View className="flex flex-col gap-1">
          <View className={"flex flex-col"}>
            {/* {playlist?.createdAt && (
            <Text className={"text-sm dark:text-white/60 text-text-200"}>
              {dayjs(playlist?.createdAt).format("DD MMM YYYY")}
            </Text>
          )} */}
            <TouchableWithoutFeedback
              onPress={() => {
                router.push(`/playlist/${playlist._id}?name=${playlist.title}`);
              }}
            >
              <Text
                className={
                  "text-lg font-semibold capitalize dark:text-white text-text-300"
                }
                numberOfLines={3}
                ellipsizeMode="tail"
                fontWeight={500}
              >
                {playlist.title}
              </Text>
            </TouchableWithoutFeedback>
          </View>

          {/* Price and Action Button */}
          <View className={"flex flex-row gap-2 items-center justify-between"}>
            <Text
              className={"text-lg  dark:text-white text-primary"}
              fontWeight={700}
            >
              {getAccountFormatter(playlist.price ?? 0)}
            </Text>

            {/* Edit Button (Visible only to the owner) */}
          </View>
        </View>
        <View className="flex flex-row gap-3 items-center justify-end">
          {user?._id && playlist?.createdBy?._id === user._id && (
            <IconButton
              icon={(props) => <Edit {...props} size={18} />}
              mode="contained"
              onPress={() => {
                router.push(`/create-playlist?id=${playlist?._id}`);
              }}
            />
          )}
          <Link href={`/playlist/${playlist._id}?name=${playlist.title}`}>
            <IconButton
              icon={(props) => <ArrowUpRight {...props} size={18} />}
              mode="contained"
            />
          </Link>
        </View>
      </View>
    </View>
  );
};
