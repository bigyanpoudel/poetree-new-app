import { Scafold } from "@/src/components";
import { PlaylistCard } from "@/src/components/playlist";
import { SectionHeading } from "@/src/components/section";
import { UserProfileCard } from "@/src/components/user/userCard";
import React from "react";
import { View } from "react-native";
import { HashTagSection } from "../components/hashTagSection";
import { UserSection } from "../components/userSection";

export const ExplorePage = () => {
  return (
    <Scafold paddingHorizontal={0}>
      <View className="flex flex-col gap-6">
        <HashTagSection />
        <UserSection />
      </View>
    </Scafold>
  );
};
