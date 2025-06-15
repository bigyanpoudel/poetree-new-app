import { ShimmerHorizontalPlaylist } from "@/src/components/playlist/horizontalPlalylist.shimmer";
import { HorizontalPlaylist } from "@/src/components/playlist/horizontalPlaylistItem";
import { EmptyState } from "@/src/components/state/emptyState";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { useGetInfiniteUsersPlayList } from "../../hooks/users";

export const ListPlaylist = () => {
  const { id } = useLocalSearchParams<{ id: string; slug: string }>();
console.log("id", id);
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  refetch,
  isRefetching,
} = useGetInfiniteUsersPlayList({ createdBy: id });
  const poems = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch(); // this will trigger a refresh of the data
  }, [refetch]);
  return (
    <View className="flex flex-1 flex-col w-full gap-5 ">
      <FlatList
        data={poems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <HorizontalPlaylist playlist={item} key={item._id} />;
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
        onEndReachedThreshold={0.01}
        ItemSeparatorComponent={() => <View className="h-2" />}
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
                <ShimmerHorizontalPlaylist key={i} />
              ))}
            </View>
          ) : null
        }
      />
    </View>
  );
};
