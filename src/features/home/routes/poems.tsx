import { Scafold } from "@/src/components/";
import { Poem } from "@/src/components/poem";
import { PoemShimmer } from "@/src/components/poem/poem.shimmer";
import { EmptyState } from "@/src/components/state/emptyState";
import React from "react";
import { FlatList, View } from "react-native";
import { useGetInfinitePost } from "../hooks/home";

export const HomePoems = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetInfinitePost();

  const poems = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch(); // this will trigger a refresh of the data
  }, [refetch]);
  return (
    <Scafold isNormalView paddingVertical={0} paddingHorizontal={0}>
      <FlatList
        data={poems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <Poem poem={item} key={item._id} />;
        }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        refreshing={isRefetching}
        onRefresh={handleRefresh}
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View className="h-5" />}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          isLoading ? (
            <View className="gap-4">
              {[...Array(3)].map((_, i) => (
                <PoemShimmer key={i} />
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
                <PoemShimmer key={i} />
              ))}
            </View>
          ) : null
        }
      />
    </Scafold>
  );
};
