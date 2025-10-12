import { Button, Text } from "@/src/components";
import {
  useFollowUser,
  useGetCurrentUser,
  useUnFollowUser,
} from "@/src/hooks/useRootHook";
import { IAppPoem } from "@/src/types";
import { getCreatedDate } from "@/src/utils/poemDateFormat";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
interface IPoemHeaderProp {
  poem?: IAppPoem;
}
export const PoemHeader: React.FC<IPoemHeaderProp> = ({ poem }) => {
  const followUser = useFollowUser();
  const unfollowUser = useUnFollowUser();
  const currentUser = useGetCurrentUser();
  const handleFollow = () => {
    if (!poem?.isFollowedByCurrentUser) {
      followUser.mutate({
        targetId: poem?.postedBy?._id as string,
      });
    } else {
      unfollowUser.mutate({
        targetId: poem?.postedBy._id as string,
      });
    }
  };
  return (
    <View className="flex flex-col gap-3">
      <View className="flex flex-row gap-3 justify-between items-center">
        <View className="flex flex-row gap-3 items-center">
          <Link
            href={`/user/${poem?.postedBy?._id}?slug=${poem?.postedBy?.slug}`}
          >
            {poem?.postedBy?.photo ? (
              <Avatar.Image
                size={40}
                source={{ uri: poem?.postedBy?.photo }}
                className="w-[40px] h-[40px] rounded-full border border-ui-border dark:border-ui-border/20"
              />
            ) : (
              <Avatar.Text
                size={40}
                label={poem?.postedBy.name?.charAt(0) ?? ""}
                labelStyle={{
                  fontSize: 16,
                  color: "white",
                }}
                className="dark:bg-black/50 bg-darkBackground "
              />
            )}
          </Link>
          <View className="flex flex-col">
            <Text className="text-base font-bold">{poem?.postedBy.name}</Text>
            <Text className="text-sm text-gray-500">
              {getCreatedDate(poem?.createdAt ?? "")}
            </Text>
          </View>
        </View>
        {currentUser.data?._id &&
          currentUser.data?._id !== poem?.postedBy?._id && (
            <Button mode="contained">Follow</Button>
          )}
      </View>

      <Text
        fontWeight={800}
        className="text-[26px] spectral -tracking-[0.5px]  font-extrabold "
      >
        {poem?.title}
      </Text>
    </View>
  );
};
