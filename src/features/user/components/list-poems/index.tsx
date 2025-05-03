import { Poem } from "@/src/components/poem";
import { POEMS } from "@/src/utils/constant/appConstant";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Divider } from "react-native-paper";
import { useGetInfiniteUserPoems } from "../../hooks/user";
import { useLocalSearchParams } from "expo-router";

export const ListPeoms = () => {
  const { id } = useLocalSearchParams<{ id: string; slug: string }>();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
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
        refreshing={isRefetching}
        onRefresh={handleRefresh}
        contentContainerStyle={{ paddingVertical: 16 }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </View>
  );
};
