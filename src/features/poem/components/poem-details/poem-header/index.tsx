import { Button, Text } from "@/src/components";
import { ActionMenu } from "@/src/components/actionMenu";
import { IAppPoem } from "@/src/types";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
interface IPoemHeaderProp {
  poem?: IAppPoem;
}
export const PoemHeader: React.FC<IPoemHeaderProp> = ({ poem }) => {
  console.log("poem?.postedBy?", poem?.postedBy);
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
            <Text className="text-base font-bold">User Name</Text>
            <Text className="text-sm text-gray-500">2021-10-10</Text>
          </View>
        </View>
        <Button mode="contained">Follow</Button>
      </View>

      <Text
        fontWeight={800}
        className="text-[26px] garamond -tracking-[0.5px]  font-extrabold "
      >
        {poem?.title}
      </Text>
    </View>
  );
};
