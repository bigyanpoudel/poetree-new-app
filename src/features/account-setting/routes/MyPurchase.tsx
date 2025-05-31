import { ScreenLayout } from "@/src/components/layout";
import { EmptyState } from "@/src/components/state/emptyState";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { MyPurchaseItem } from "../components/MyPurchaseItem";
import { MyPurchaseItemShimmer } from "../components/MyPurchaseItem.shimmer";
import { useGetMyPurchaseList } from "../hook/purchase";
import { IPurchase } from "../types/accountSetting";

export const MyPurchase = () => {
  const [page, setPage] = React.useState<number>(1);
  const { data, isLoading, isError, error, refetch } = useGetMyPurchaseList({
    limit: 20,
    pageParam: page,
  });

  const purchases = data?.data || [];

  const handleLoadMore = () => {
    if (data && data.currentPage < data.totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderPurchaseItem = ({ item }: { item: IPurchase }) => (
    <MyPurchaseItem purchase={item} />
  );

  const renderFooter = () => {
    if (!isLoading || purchases.length === 0) return null;
    return (
      <View className="py-4 justify-center items-center">
        <ActivityIndicator size="small" color="#666" />
      </View>
    );
  };


  if (isLoading && purchases.length === 0) {
    return (
      <ScreenLayout
        appBar={{
          title: "My Purchase",
        }}
        scafold={{
          paddingHorizontal: 0,
        }}
      >
        <View className="flex-1 py-2">
          <FlatList
            data={Array.from({ length: 5 })}
            renderItem={() => <MyPurchaseItemShimmer />}
            keyExtractor={(_, index) => `shimmer-${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </View>
      </ScreenLayout>
    );
  }


  if (purchases.length === 0) {
    return (
      <ScreenLayout
        appBar={{
          title: "My Purchase",
        }}
        scafold={{
          paddingHorizontal: 0,
        }}
      >
        <EmptyState/>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      appBar={{
        title: "My Purchase",
      }}
      scafold={{
        paddingHorizontal: 0,
      }}
    >
      <View className="flex-1 py-2">
        <FlatList
          data={purchases}
          renderItem={renderPurchaseItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </View>
    </ScreenLayout>
  );
};
