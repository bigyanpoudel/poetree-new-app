import { Scafold } from "@/src/components";
import { PlaylistCard } from "@/src/components/playlist";
import React from "react";
import { FlatList, View } from "react-native";
import { LatestSection } from "../components/latest";
import { TrendingSection } from "../components/trending";

export const MarketplacePage = () => {
  return (
    <Scafold paddingHorizontal={0}>
      <View className="flex flex-col gap-6 pb-20">
        {/* <LatestSection />
        <TrendingSection /> */}
      </View>
    </Scafold>
  );
};
