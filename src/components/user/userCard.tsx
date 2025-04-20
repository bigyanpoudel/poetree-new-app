import { formatPoemNumber } from "@/src/utils/poem";
import React from "react";
import { View } from "react-native";
import { Avatar, Title } from "react-native-paper";
import { Button } from "../button";
import { Text } from "../text";

export const UserProfileCard = ({}) => {
  return (
    <View
      className={
        "bg-white dark:bg-transparent flex flex-col gap-3  p-3 rounded-md border border-ui-border dark:border-ui-border/20"
      }
    >
      {/* Avatar Section */}
      <View className="flex flex-row gap-6">
        <Avatar.Text
          size={60}
          label="XD"
          labelStyle={{
            fontSize: 16,
            color: "white",
          }}
          className="dark:bg-black/50 bg-darkBackground "
        />

        {/* User Info Section */}
        <View className={"flex flex-col gap-1"}>
          <Text
            className={
              "text-lg m-0 p-0 max-w-[90%] text-text-300 dark:text-white font-medium"
            }
            numberOfLines={2}
            ellipsizeMode="tail"
            fontWeight={600}
          >
            User Name
          </Text>

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
                {formatPoemNumber(12)}
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
                {formatPoemNumber(1111)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-row gap-4 flex-1">
        <Button mode="contained" onPress={() => {}} className={"flex-1"}>
          Follow
        </Button>

        <Button
          mode="outlined"
          className={"bg-blue-dark dark:bg-darker-100 flex-1"}
        >
          View Profile
        </Button>
      </View>
    </View>
  );
};
