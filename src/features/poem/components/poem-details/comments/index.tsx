import React from "react";
import { FlatList, View } from "react-native";
import { CommentItem } from "./helpers/commentItem";
import { CommentInputSection } from "./helpers/commentInputSection";
import { useGetInfinitePostComments } from "../../../hooks/poemDetail";
import { UserProfileCardShimmer } from "@/src/components/user/userCard.shimmer";
import { useAppProvider } from "@/src/provider/appProvider";
import { Text } from "@/src/components";
interface IPoemCommentSections {
  id: string;
}
export const PoemCommentSections: React.FC<IPoemCommentSections> = ({ id }) => {
  const { user } = useAppProvider();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetInfinitePostComments({ id });
  const comments = data?.pages.flatMap((page: any) => page?.data) || [];
  const handleRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);
  console.log("comments", comments);
  return (
    <View className="flex flex-col flex-1 gap-4">
      <Text fontWeight={600} className={"text-lg "}>
        Comments
      </Text>
      {user?._id && <CommentInputSection id={id} />}
      <FlatList
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <CommentItem poemId={id} comment={item} key={item._id} />;
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
                <UserProfileCardShimmer key={i} />
              ))}
            </View>
          ) : null
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
    </View>
  );
};
