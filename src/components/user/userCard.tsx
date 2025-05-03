import {
  useFollowUser,
  useGetCurrentUser,
  useUnFollowUser,
} from "@/src/hooks/useRootHook";
import { IAppUser } from "@/src/types";
import { formatPoemNumber } from "@/src/utils/poem";
import { Link, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { Button } from "../button";
import { Text } from "../text";
interface IUserProfileCardProps {
  user: IAppUser;
}
export const UserProfileCard: React.FC<IUserProfileCardProps> = ({ user }) => {
  const router = useRouter();
  const followUser = useFollowUser();
  const unfollowUser = useUnFollowUser();
  const currentUser = useGetCurrentUser();
  const handleFollow = () => {
    if (!user?.isFollowing) {
      followUser.mutate({
        targetId: user?._id as string,
      });
    } else {
      unfollowUser.mutate({
        targetId: user._id,
      });
    }
  };
  return (
    <View
      className={
        "bg-white dark:bg-transparent flex flex-col gap-3  p-3 rounded-md border border-ui-border dark:border-ui-border/20"
      }
    >
      {/* Avatar Section */}
      <View className="flex flex-row gap-6">
        <Link href={`/user/${user?._id}?slug=${user?.slug}`}>
          {user?.photo ? (
            <Avatar.Image
              size={40}
              source={{ uri: user?.photo }}
              className="w-[40px] h-[40px] rounded-full border border-ui-border dark:border-ui-border/20"
            />
          ) : (
            <Avatar.Text
              size={40}
              label={user.name?.charAt(0) ?? ""}
              labelStyle={{
                fontSize: 16,
                color: "white",
              }}
              className="dark:bg-black/50 bg-darkBackground "
            />
          )}
        </Link>
        {/* User Info Section */}
        <View className={"flex flex-col gap-1"}>
          <Link href={`/user/${user?._id}?slug=${user?.slug}`}>
            <Text
              className={
                "text-lg m-0 p-0 max-w-[90%] text-text-300 dark:text-white font-medium"
              }
              numberOfLines={2}
              ellipsizeMode="tail"
              fontWeight={600}
            >
              {user.name}
            </Text>
          </Link>
          {/* Followers and Following Section */}
          <View className={"flex flex-row  gap-6 w-full"}>
            <View className={"items-center"}>
              <Text className={"text-sm font-normal dark:text-text-100"}>
                Followers
              </Text>
              <Text
                fontWeight={700}
                className={
                  "text-base font-medium dark:text-white text-text-300"
                }
              >
                {formatPoemNumber(user?.followersCount)}
              </Text>
            </View>
            <View className={"items-center"}>
              <Text className={"text-sm font-normal dark:text-text-100"}>
                Following
              </Text>
              <Text
                fontWeight={700}
                className={
                  "text-base font-medium dark:text-white text-text-300"
                }
              >
                {formatPoemNumber(user?.followingCount)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-row gap-4 flex-1">
        {currentUser.data?._id && (
          <Button
            loading={followUser.isPending || unfollowUser.isPending}
            mode="contained"
            onPress={handleFollow}
            className={"flex-1"}
          >
            {user.isFollowing ? "UnFollow" : "Follow"}
          </Button>
        )}

        <Button
          mode="outlined"
          onPress={() => {
            router.push(`/user/${user?._id}?slug=${user?.slug}`);
          }}
          className={"bg-blue-dark dark:bg-darker-100 flex-1"}
        >
          View Profile
        </Button>
      </View>
    </View>
  );
};
