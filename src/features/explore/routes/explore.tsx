import { Scafold } from "@/src/components";
import { PlaylistCard } from "@/src/components/playlist";
import { RenderHashTag } from "@/src/components/poem/helper/poemHashTag";
import { SectionHeading } from "@/src/components/section";
import { UserProfileCard } from "@/src/components/user/userCard";
import React from "react";
import { View } from "react-native";

export const ExplorePage = () => {
  return (
    <Scafold paddingHorizontal={0}>
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-3">
          <SectionHeading title="Trending Hastags" onPress={() => {}} />
          <View className="px-5">
            <RenderHashTag
              hashtags={[
                { _id: "1", name: "ReactNative" },
                { _id: "2", name: "JavaScript" },
                { _id: "3", name: "UIUX" },
                { _id: "11", name: "ReactNative" },
                { _id: "22", name: "JavaScript" },
                { _id: "33", name: "UIUX" },
                { _id: "333", name: "UIUX" },
                { _id: "222", name: "JavaScript" },
                { _id: "111", name: "ReactNative" },
              ]}
            />
          </View>
        </View>
        <View className="flex flex-col gap-3">
          <SectionHeading title="Users" onPress={() => {}} />
          <View className="px-5 flex flex-col gap-4">
            <UserProfileCard />
            <UserProfileCard />
            <PlaylistCard />
          </View>
        </View>
      </View>
    </Scafold>
  );
};
