import { PlaylistCard } from "@/src/components/playlist";
import { SectionHeading } from "@/src/components/section";
import React from "react";
import { FlatList, View } from "react-native";

export const TrendingSection = () => {
  const data = [
    {
      id: "1",
      thumbnail: "https://example.com/thumbnail1.jpg",
      title: "Item 1",
      subtitle: "Subtitle 1",
    },
    {
      id: "2",
      thumbnail: "https://example.com/thumbnail2.jpg",
      title: "Item 2",
      subtitle: "Subtitle 2",
    },
    {
      id: "3",
      thumbnail: "https://example.com/thumbnail3.jpg",
      title: "Item 3",
      subtitle: "Subtitle 3",
    },
  ];
  return (
    <View className="flex flex-col gap-4">
      <SectionHeading title="Latest Playlist" onPress={() => {}} />
      <FlatList
        data={data}
        renderItem={() => <PlaylistCard />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15, paddingRight: 20 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      />
    </View>
  );
};
