import { PlaylistCard } from "@/src/components/playlist";
import { SectionHeading } from "@/src/components/section";
import React from "react";
import { FlatList, View, useWindowDimensions } from "react-native";
import { useGetLatestPlaylist } from "../../hooks/shop";
import { PlaylistCardShimmer } from "@/src/components/playlist/playlist.shimmer";
import { EmptyState } from "@/src/components/state/emptyState";

// Memoize the playlist card for better performance
const MemoizedPlaylistCard = React.memo(PlaylistCard);

export const LatestSection = React.memo(() => {
  const latest = useGetLatestPlaylist();
  const { width } = useWindowDimensions();
  
  const renderItem = React.useCallback(
    ({ item }: { item: any }) => <MemoizedPlaylistCard playlist={item} />,
    []
  );
  
  const keyExtractor = React.useCallback((item: any) => item?._id, []);
  
  const ItemSeparator = React.useCallback(() => <View style={{ width: 12 }} />, []);
  
  const EmptyComponent = React.useMemo(() => {
    if (latest.isPending) {
      return (
        <View className="gap-4 flex flex-row flex-1">
          {[...Array(3)].map((_, i) => (
            <PlaylistCardShimmer key={i} />
          ))}
        </View>
      );
    }
    return (
      <View style={{ width: width - 30 }}>
        <EmptyState />
      </View>
    );
  }, [latest.isPending, width]);
  
  return (
    <View className="flex flex-col gap-4">
      <SectionHeading title="Latest Playlist" />
      <FlatList
        data={latest.data?.data || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15, paddingRight: 20 }}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyComponent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        initialNumToRender={3}
      />
    </View>
  );
});
