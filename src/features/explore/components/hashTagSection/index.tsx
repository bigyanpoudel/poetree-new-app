import {
  HashtagButtonShimmer,
  RenderHashTag,
} from "@/src/components/poem/helper/poemHashTag";
import { SectionHeading } from "@/src/components/section";
import React from "react";
import { View } from "react-native";
import { useGetInfiniteHasTagsPost } from "../../hooks/explore";
import { useRouter } from "expo-router";

export const HashTagSection = () => {
  const { data, isLoading } = useGetInfiniteHasTagsPost();
  const router = useRouter();
  const hashTags = data?.pages.flatMap((page: any) => page?.data) || [];
  console.log(hashTags, "hashTags");

  const handleViewAll = () => {
    router.push("/hashtags");
  };

  return (
    <View className="flex flex-col gap-3">
      <SectionHeading title="Trending Hastags" onPress={handleViewAll} />
      <View className="px-5">
        {isLoading && (
          <View className="flex flex-row gap-4 flex-wrap">
            {[...Array(5)].map((_, i) => (
              <HashtagButtonShimmer key={i} />
            ))}
          </View>
        )}
        <RenderHashTag hashtags={hashTags?.map((item) => item.hashtag) ?? []} />
      </View>
    </View>
  );
};
