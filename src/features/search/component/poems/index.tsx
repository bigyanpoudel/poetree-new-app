import { Scafold } from "@/src/components";
import { Poem } from "@/src/components/poem";
import { IAppPoem } from "@/src/types";
import { POEMS } from "@/src/utils/constant/appConstant";
import React from "react";
import { FlatList, View } from "react-native";
import { useGetInfiniteSearchPost } from "../../hook/search";
import { PoemShimmer } from "@/src/components/poem/poem.shimmer";
import { SearchEmptyState } from "@/src/components/state/searchEmptyState";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
interface ISearchPoemListProps {
  search?: string;
}
export const SearchPoemList: React.FC<ISearchPoemListProps> = ({ search }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetInfiniteSearchPost({ search: search ?? "" });
  const isDarked = useIsDarkTheme();
  const poems = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch(); // this will trigger a refresh of the data
  }, [refetch]);
  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: isDarked
          ? Colors.dark.scafoldColor
          : Colors.light.scafoldColor,
        paddingBottom: 40,
      }}
      data={poems}
      keyExtractor={(item, index) => `${item._id}-${index}`}
      renderItem={({ item }) => <Poem poem={item} />}
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
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={5}
      ListEmptyComponent={
        isLoading ? (
          <View className="gap-4">
            {[...Array(3)].map((_, i) => (
              <PoemShimmer key={i} />
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
              <PoemShimmer key={i} />
            ))}
          </View>
        ) : null
      }
    />
  );
};
