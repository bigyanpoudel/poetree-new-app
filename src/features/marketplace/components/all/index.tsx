import { HorizontalPlaylist } from "@/src/components/playlist/horizontalPlaylistItem";
import { PlaylistCardShimmer } from "@/src/components/playlist/playlist.shimmer";
import { SectionHeading } from "@/src/components/section";
import { EmptyState } from "@/src/components/state/emptyState";
import React from "react";
import { FlatList, View } from "react-native";
import { useGetInfinitePlayList } from "../../hooks/shop";
import { ShimmerHorizontalPlaylist } from "@/src/components/playlist/horizontalPlalylist.shimmer";

export const AllSection = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetInfinitePlayList({});

  const poems = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch(); // this will trigger a refresh of the data
  }, [refetch]);
  return (
    <View className="flex flex-col gap-4">
      <SectionHeading title="All" />
      <FlatList
        data={poems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <HorizontalPlaylist
              style={{
                width: "100%",
              }}
              playlist={item}
              key={item._id}
            />
          );
        }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onMomentumScrollBegin={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
        onEndReachedThreshold={0.01}
        ListEmptyComponent={
          isLoading ? (
            <View className="gap-4">
              {[...Array(3)].map((_, i) => (
                <ShimmerHorizontalPlaylist key={i} />
              ))}
            </View>
          ) : (
            <EmptyState />
          )
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="gap-4 mt-2">
              {[...Array(2)].map((_, i) => (
                <PlaylistCardShimmer key={i} />
              ))}
            </View>
          ) : null
        }
      />
    </View>
  );
};
