import { Poem } from "@/src/components/poem";
import React from "react";
import { FlatList, View } from "react-native";

import { PoemShimmer } from "@/src/components/poem/poem.shimmer";
import { EmptyState } from "@/src/components/state/emptyState";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { useGetInfiniteUserFeedPost } from "../hooks/home";

export const HomeYourFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetInfiniteUserFeedPost();
  const isDarked = useIsDarkTheme();
  const poems = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch(); // this will trigger a refresh of the data
  }, [refetch]);
  return (
    <View
      className="flex flex-1 pb-20"
      style={{
        flex: 1,
        backgroundColor: isDarked
          ? Colors.dark.scafoldColor
          : Colors.light.scafoldColor,
      }}
    >
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
        ItemSeparatorComponent={() => <View className="h-2" />}
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
            <View className="gap-4  mt-2">
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
