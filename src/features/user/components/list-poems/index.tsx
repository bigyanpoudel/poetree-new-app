import { Poem } from "@/src/components/poem";
import { PoemShimmer } from "@/src/components/poem/poem.shimmer";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { useGetInfiniteUserPoems } from "../../hooks/user";
import { EmptyState } from "@/src/components/state/emptyState";

export const ListPeoms = () => {
  const { id } = useLocalSearchParams<{ id: string; slug: string }>();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetInfiniteUserPoems({ userId: id });
  const poems = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch(); // this will trigger a refresh of the data
  }, [refetch]);
  return (
    <View className="flex flex-1 flex-col gap-4">
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
        contentContainerStyle={{ paddingVertical: 16 }}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View className="h-2" />}
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
    </View>
  );
};
