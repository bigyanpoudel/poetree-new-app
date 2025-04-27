import { Button, Text } from "@/src/components";
import { IAppUser } from "@/src/types";
import { formatPoemNumber } from "@/src/utils/poem";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Avatar } from "react-native-paper";
interface IProfileCardProps {
  user: IAppUser;
}
export const ProfileCard: React.FC<IProfileCardProps> = ({ user }) => {
  const router = useRouter();
  return (
    <View className="h-fit w-full bg-white dark:bg-white/5 p-4 text-white flex flex-col gap-4">
      <View className="flex flex-row gap-4 items-center">
        <TouchableOpacity className="relative w-24 h-24">
          {user.photo ? (
            <FastImage
              source={{ uri: user.photo }}
              className="w-[90px] h-[90px] rounded-full border border-ui-border dark:border-ui-border/20"
            />
          ) : (
            <Avatar.Text
              size={90}
              label={user.name.charAt(0)}
              labelStyle={{
                fontSize: 16,
                color: "white",
              }}
              className="dark:bg-black/50 bg-darkBackground "
            />
          )}
        </TouchableOpacity>
        <View className="flex flex-col flex-1 justify-center ">
          <Text fontWeight={700} className=" text-2xl font-semibold">
            {user.name}
          </Text>
          <Text className="dark:text-white/50 text-black/60  font-normal text-sm ">
            @{user.slug}
          </Text>
        </View>
      </View>

      {user?.about && (
        <Text className="dark:text-white/50 text-black/60 font-normal text-base ">
          {user.about}
        </Text>
      )}

      <View className="flex flex-row gap-8 my-2   items-center">
        <TouchableOpacity className="flex flex-col items-center justify-center">
          <Text
            fontWeight={700}
            className="text-lg font-semibold font-proxima-extrabold"
          >
            {formatPoemNumber(user.followingCount)}{" "}
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
            {formatPoemNumber(user.followingCount)}{" "}
          </Text>
          <Text className="text-sm font-normal dark:text-white/50 text-black/60">
            Following
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-col items-center justify-center">
          <Text fontWeight={700} className="text-lg font-semibold">
            {formatPoemNumber(user.followersCount)}
          </Text>
          <Text className="text-sm font-normal dark:text-white/50 text-black/60">
            Followers
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        onPress={() => {}}
        labelStyle={{
          fontSize: 20,
        }}
        contentStyle={{
          padding: 0,
          height: 48,
        }}
        className={"flex-1 py-0"}
      >
        Follow
      </Button>
    </View>
  );
};
