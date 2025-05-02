import { Button, Text } from "@/src/components";
import {
  useFollowUser,
  useGetCurrentUser,
  useUnFollowUser,
} from "@/src/hooks/useRootHook";
import { formatPoemNumber } from "@/src/utils/poem";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Avatar } from "react-native-paper";
import { useGetUserProfile } from "../../hooks/user";
interface IProfileCardProps {}
export const ProfileCard: React.FC<IProfileCardProps> = ({}) => {
  const router = useRouter();
  const user = useGetUserProfile();
  const currentUser = useGetCurrentUser();
  const followUser = useFollowUser();
  const unfollowUser = useUnFollowUser();
  const handleFollow = () => {
    if (!user.data?.isFollowing) {
      followUser.mutate({
        targetId: user.data?._id as string,
      });
    } else {
      unfollowUser.mutate({
        targetId: user.data._id,
      });
    }
  };
  return (
    <View className="h-fit w-full bg-white dark:bg-white/5 p-4 py-6 text-white flex flex-col gap-4">
      <View className="flex flex-row gap-6 items-center">
        <TouchableOpacity className="relative w-24 h-24">
          {user.data?.photo ? (
            <FastImage
              source={{ uri: user.data?.photo }}
              className="w-[90px] h-[90px] rounded-full border border-ui-border dark:border-ui-border/20"
            />
          ) : (
            <Avatar.Text
              size={90}
              label={user.data?.name?.charAt(0) ?? ""}
              labelStyle={{
                fontSize: 16,
                color: "white",
              }}
              className="dark:bg-black/50 bg-darkBackground "
            />
          )}
        </TouchableOpacity>
        <View className="flex flex-col flex-1  ">
          <Text fontWeight={700} className=" text-2xl mt-2 font-semibold">
            {user.data?.name}
          </Text>
          <View className="flex flex-row gap-8    items-center">
            <TouchableOpacity className="flex flex-col items-center justify-center">
              <Text
                fontWeight={700}
                className="text-lg font-semibold font-proxima-extrabold"
              >
                {formatPoemNumber(0)}
              </Text>
              <Text className="text-sm font-normal dark:text-white/50 text-black/60">
                Poem
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/follower/123");
              }}
              className="flex flex-col items-center justify-center"
            >
              <Text fontWeight={700} className="text-lg font-semibold">
                {formatPoemNumber(user.data?.followingCount)}{" "}
              </Text>
              <Text className="text-sm font-normal dark:text-white/50 text-black/60">
                Following
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-col items-center justify-center">
              <Text fontWeight={700} className="text-lg font-semibold">
                {formatPoemNumber(user.data?.followersCount)}{" "}
              </Text>
              <Text className="text-sm font-normal dark:text-white/50 text-black/60">
                Followers
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {user?.data?.about && (
        <Text className="dark:text-white/50 text-black/60 font-normal text-base ">
          {user.data.about}
        </Text>
      )}

      {user.data?._id !== currentUser.data?._id && (
        <Button
          mode="contained"
          onPress={handleFollow}
          loading={followUser.isPending || unfollowUser.isPending}
          labelStyle={{
            fontSize: 20,
          }}
          contentStyle={{
            padding: 0,
            height: 48,
          }}
          className={"flex-1 py-0"}
        >
          {user.data?.isFollowing ? "Following" : "Follow"}
        </Button>
      )}
      {user.data?._id === currentUser.data?._id && (
        <Button
          mode="contained"
          onPress={() => {
            router.push("/account/edit-profile");
          }}
          labelStyle={{
            fontSize: 20,
          }}
          contentStyle={{
            padding: 0,
            height: 48,
          }}
          className={"flex-1 py-0 mt-4"}
        >
          Edit Profile
        </Button>
      )}
    </View>
  );
};
