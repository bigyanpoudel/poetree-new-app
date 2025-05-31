import { Scafold } from "@/src/components";
import { ShimmerHorizontalPlaylist } from "@/src/components/playlist/horizontalPlalylist.shimmer";
import { HorizontalPlaylist } from "@/src/components/playlist/horizontalPlaylistItem";
import { SearchEmptyState } from "@/src/components/state/searchEmptyState";
import React from "react";
import { FlatList, View } from "react-native";
import { useGetHomeInfinitePlayList } from "../../hook/search";
interface ISearchPaylistProps {
  search?: string;
}
export const SearchPaylist: React.FC<ISearchPaylistProps> = ({ search }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetHomeInfinitePlayList({ search: search });
  const playlist = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);
  return (
    <Scafold isNormalView paddingVertical={8} paddingHorizontal={0}>
      <FlatList
        data={playlist}
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
        refreshing={isRefetching}
        onRefresh={handleRefresh}
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          isLoading ? (
            <View className="gap-4">
              {[...Array(3)].map((_, i) => (
                <ShimmerHorizontalPlaylist key={i} />
              ))}
            </View>
          ) : (
            <SearchEmptyState />
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
    </Scafold>
  );
};
