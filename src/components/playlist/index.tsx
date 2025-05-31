import { useAppProvider } from "@/src/provider/appProvider";
import { IAppPlayList } from "@/src/types";
import { getAccountFormatter } from "@/src/utils/currency";
import { Link, useRouter } from "expo-router";
import { ArrowUpRight, Edit } from "lucide-react-native"; // For icons
import React from "react";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { IconButton } from "../button/iconButton";
import { Text } from "../text";
interface IPlaylistCardProps {
  style?: StyleProp<ViewStyle>;
  playlist: IAppPlayList;
}
export const PlaylistCard: React.FC<IPlaylistCardProps> = ({
  style = {},
  playlist,
}) => {
  const { user } = useAppProvider();
  const router = useRouter();
  return (
    <View
      className="border-ui-border h-[220px] dark:border-ui-border/20 rounded-lg bg-white dark:bg-darker-100"
      style={[
        {
          width: 260,
        },
        style,
      ]}
    >
      {/* Thumbnail or Placeholder */}

      <View
        className={
          "w-full h-[100px] rounded-t-lg bg-ui-border dark:bg-ui-border/10 flex items-center justify-center"
        }
      >
        {playlist.thumbnail ? (
          <Image
            source={{
              uri: playlist.thumbnail,
            }}
            className="h-full w-full rounded-t-lg object-cover "
          />
        ) : (
          <Text className={"text-3xl text-center"}>
            {playlist.title?.charAt(0)}
          </Text>
        )}
      </View>

      {/* Card Content */}
      <View className={"px-4 py-3 flex flex-col justify-between gap-1 flex-1"}>
        {/* Title and Date */}
        <View className={"flex flex-col"}>
          {/* {playlist?.createdAt && (
            <Text className={"text-sm dark:text-white/60 text-text-200"}>
              {dayjs(playlist?.createdAt).format("DD MMM YYYY")}
            </Text>
          )} */}

          <Text
            className={"text-lg font-semibold dark:text-white text-text-300"}
            numberOfLines={2}
            ellipsizeMode="tail"
            fontWeight={700}
          >
            {playlist.title}
          </Text>
        </View>

        {/* Price and Action Button */}
        <View className={"flex flex-row gap-2 items-center justify-between"}>
          <Text
            className={"text-lg  dark:text-white text-primary"}
            fontWeight={500}
          >
            {getAccountFormatter(playlist.price ?? 0)}
          </Text>

          {/* Edit Button (Visible only to the owner) */}
          <View className="flex flex-row items-center justify-end gap-0">
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
    </View>
  );
};
