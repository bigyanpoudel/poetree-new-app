import { SearchEmptyState } from "@/src/components/state/searchEmptyState";
import { UserProfileCard } from "@/src/components/user/userCard";
import { UserProfileCardShimmer } from "@/src/components/user/userCard.shimmer";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import React from "react";
import { FlatList, View } from "react-native";
import { useGetInfiniteSearchUser } from "../../hook/search";
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
  const isDarked = useIsDarkTheme();
  const users = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);
  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: isDarked
          ? Colors.dark.scafoldColor
          : Colors.light.scafoldColor,
        paddingBottom: 20,
      }}
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
      onMomentumScrollBegin={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      refreshing={isRefetching}
      onRefresh={handleRefresh}
      contentContainerStyle={{ paddingVertical: 16 }}
      ItemSeparatorComponent={() => <View className="h-2" />}
      onEndReachedThreshold={0.01}
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
  );
};
