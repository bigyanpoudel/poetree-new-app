import { Button, Text } from "@/src/components";
import { useFollowUser, useUnFollowUser } from "@/src/hooks/useRootHook";
import { IAppUser } from "@/src/types";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
interface IUserItemProps {
  user?: IAppUser;
}
export const UserItem: React.FC<IUserItemProps> = ({ user }) => {
  const followUser = useFollowUser();
  const unfollowUser = useUnFollowUser();
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
    <View>
      <View className="flex flex-row gap-3 justify-between items-center">
        <View className="flex flex-row gap-3 items-center">
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
                label={user?.name?.charAt(0) ?? ""}
                labelStyle={{
                  fontSize: 16,
                  color: "white",
                }}
                className="dark:bg-black/50 bg-darkBackground "
              />
            )}
          </Link>
          <View className="flex flex-col">
            <Text className="text-base font-bold">@{user?.slug}</Text>
            <Text className="text-sm text-gray-500">{user?.name}</Text>
          </View>
        </View>
        <Button
          loading={followUser.isPending || unfollowUser.isPending}
          onPress={handleFollow}
          mode="contained"
        >
          {user?.isFollowing ? "UnFollow" : "Follow"}
        </Button>
      </View>
    </View>
  );
};
