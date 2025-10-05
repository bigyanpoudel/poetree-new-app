import { ScreenLayout } from "@/src/components/layout";
import { EmptyState } from "@/src/components/state/emptyState";
import { IPoemSubmission } from "@/src/types";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { SubmissionCard } from "../components/submissionCard";
import { SubmissionCardShimmer } from "../components/submissionCardShimmer";
import { useGetUserSubmission } from "../hooks";

export const SubmissionsList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetUserSubmission({ limit: 12 });

  // Flatten the paginated data
  const submissions = data?.pages.flatMap((page: any) => page?.data) || [];

  const router = useRouter();

  const handleSubmissionPress = (submission: IPoemSubmission) => {
    router.push({
      pathname: "/submission-detail",
      params: {
        submission: JSON.stringify(submission),
      },
    });
  };

  const renderSubmission = ({ item }: { item: IPoemSubmission }) => (
    <SubmissionCard submission={item} onPress={handleSubmissionPress} />
  );


  return (
    <ScreenLayout
      scafold={{
        paddingHorizontal: 0,
        paddingVertical: 20,
        refreshControl: (
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        ),
      
      }}
      
      appBar={{
        title: "My Submissions",
      }}
    >
      <FlatList
        data={submissions}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={renderSubmission}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <View>
              {[...Array(5)].map((_, i) => (
                <SubmissionCardShimmer key={i + "submissionLoading"} />
              ))}
            </View>
          ) : (
            <EmptyState />
          )
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="mt-2">
              {[...Array(2)].map((_, i) => (
                <SubmissionCardShimmer key={i + "submissionLoadingFooter"} />
              ))}
            </View>
          ) : null
        }
      />

    </ScreenLayout>
  );
};