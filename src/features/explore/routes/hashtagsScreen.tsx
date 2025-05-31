import { ScreenLayout } from "@/src/components/layout";
import {
  HashtagButtonShimmer,
  RenderHashTag
} from "@/src/components/poem/helper/poemHashTag";
import { EmptyState } from "@/src/components/state/emptyState";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useGetInfiniteHasTagsPost } from "../hooks/explore";

export const HashtagsScreen = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useGetInfiniteHasTagsPost();

  const hashTags = data?.pages.flatMap((page: any) => page?.data) || [];

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    
    if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <ScreenLayout
        appBar={{
          title: "All Hashtags",
        }}
      >
        <ScrollView className="flex-1 px-5 py-4">
          <View className="flex flex-row gap-4 flex-wrap">
            {Array.from({ length: 12 }).map((_, i) => (
              <HashtagButtonShimmer key={i} />
            ))}
          </View>
        </ScrollView>
      </ScreenLayout>
    );
  }


  if (hashTags.length === 0) {
    return (
      <ScreenLayout
        appBar={{
          title: "All Hashtags",
        }}
      >
       <EmptyState/>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      appBar={{
        title: "All Hashtags",
      }}
    >
      <ScrollView 
        className="flex-1" 
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <View className="flex flex-row flex-wrap gap-3">
          {hashTags.map((item, index) => (
            <RenderHashTag key={`${item.hashtag._id}-${index}`} hashtags={[item.hashtag]} />
          ))}
        </View>
        {isFetchingNextPage && (
          <View className="py-4 justify-center items-center">
            <ActivityIndicator size="small" color="#666" />
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};