import { Scafold, Text } from "@/src/components/";
import { Poem } from "@/src/components/poem";
import { POEMS } from "@/src/utils/constant/appConstant";
import React from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import { Divider } from "react-native-paper";
import { useGetInfinitePost } from "../hooks/home";
import { IAppPoem } from "@/src/types";

export const HomePoems = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
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
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </Scafold>
  );
};
