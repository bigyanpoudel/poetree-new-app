import { Scafold } from "@/src/components";
import { PlaylistCard } from "@/src/components/playlist";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import { LatestSection } from "../components/latest";
import { TrendingSection } from "../components/trending";
import { AllSection } from "../components/all";

export const MarketplacePage = () => {
  return (
    <Scafold paddingHorizontal={0}>
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        removeClippedSubviews={true}
      >
        <View className="flex flex-col gap-6">
          <LatestSection />
          <TrendingSection />
          <AllSection />
        </View>
      </ScrollView>
    </Scafold>
  );
};
