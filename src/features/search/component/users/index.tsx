import { Scafold } from "@/src/components";
import { UserProfileCard } from "@/src/components/user/userCard";
import React from "react";
import { FlatList, View } from "react-native";
import { useGetInfiniteSearchUser } from "../../hook/search";
import { UserProfileCardShimmer } from "@/src/components/user/userCard.shimmer";
import { SearchEmptyState } from "@/src/components/state/searchEmptyState";
interface ISsearchUserList {
  search?: string;
}
export const SearchUserList: React.FC<ISsearchUserList> = ({ search = "" }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetInfiniteSearchUser({ search: search });
  const users = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);
  return (
    <Scafold isNormalView paddingVertical={8}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <UserProfileCard user={item} key={item._id} />;
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
                <UserProfileCardShimmer key={i} />
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
                <UserProfileCardShimmer key={i} />
              ))}
            </View>
          ) : null
        }
      />
    </Scafold>
  );
};
