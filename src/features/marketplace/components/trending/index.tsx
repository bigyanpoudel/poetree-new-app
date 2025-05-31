import { PlaylistCard } from "@/src/components/playlist";
import { PlaylistCardShimmer } from "@/src/components/playlist/playlist.shimmer";
import { SectionHeading } from "@/src/components/section";
import { EmptyState } from "@/src/components/state/emptyState";
import React from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { useGetTrendingPlaylist } from "../../hooks/shop";

export const TrendingSection = () => {
  const trending = useGetTrendingPlaylist();
  const { width } = useWindowDimensions();
  return (
    <View className="flex flex-col gap-4">
      <SectionHeading title="Latest Playlist" />
      <FlatList
        data={trending.data?.data}
        renderItem={({ item }) => <PlaylistCard playlist={item} />}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15, paddingRight: 20 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        ListEmptyComponent={
          trending.isLoading ? (
            <View className="gap-4 flex flex-row flex-1">
              {[...Array(3)].map((_, i) => (
                <PlaylistCardShimmer key={i} />
              ))}
            </View>
          ) : (
            <View style={{ width: width - 30 }}>
              <EmptyState />
            </View>
          )
        }
      />
    </View>
  );
};
