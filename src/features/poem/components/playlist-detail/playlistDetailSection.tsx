import { Text } from "@/src/components";
import { IAppPlayList } from "@/src/types";
import { getCreatedDate } from "@/src/utils/poemDateFormat";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { PlaylistActions } from "./poemActions";
import { usePurchasePlaylist } from "../../hooks/palylistDetails";
interface IPlaylistDetailSectionProps {
  playlist?: IAppPlayList;
}
export const PlaylistDetailSection: React.FC<IPlaylistDetailSectionProps> = ({
  playlist,
}) => {
  const purchasePlaylist = usePurchasePlaylist();
  return (
    <View className="px-5 mt-4 flex flex-col gap-3 dark:bg-darker-100 bg-white py-3">
      <View className="flex flex-col gap-8">
        <View className="flex flex-col gap-5">
          <Text fontWeight={600} className="text-2xl">
            {playlist?.title}
          </Text>
          {playlist && <PlaylistActions poem={playlist} />}
        </View>
        <View className="flex flex-row gap-3 justify-between items-center">
          <View className="flex flex-row gap-3 items-center">
            <Link
              href={`/user/${playlist?.createdBy?._id}?slug=${playlist?.createdBy?.slug}`}
            >
              {playlist?.createdBy?.photo ? (
                <Avatar.Image
                  size={40}
                  source={{ uri: playlist?.createdBy?.photo }}
                  className="w-[40px] h-[40px] rounded-full border border-ui-border dark:border-ui-border/20"
                />
              ) : (
                <Avatar.Text
                  size={40}
                  label={playlist?.createdBy.name?.charAt(0) ?? ""}
                  labelStyle={{
                    fontSize: 16,
                    color: "white",
                  }}
                  className="dark:bg-black/50 bg-darkBackground "
                />
              )}
            </Link>
            <View className="flex flex-col">
              <Text className="text-base font-bold">
                {playlist?.createdBy.name}
              </Text>
              <Text className="text-sm text-gray-500">
                {getCreatedDate(playlist?.createdAt ?? "")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
