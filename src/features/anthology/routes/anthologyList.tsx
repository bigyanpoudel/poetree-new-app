import { AnthologyCard } from "@/src/components/anthologyCard";
import { ScreenLayout } from "@/src/components/layout";
import { EmptyState } from "@/src/components/state/emptyState";
import { IAppAnthology } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";
import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Searchbar } from "react-native-paper";

import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { useRouter } from "expo-router";
import { useGetPublicAnthologies } from "../hooks";
import { AnthologyCardShimmer } from "../components/anthologyCardShimmer";


export const AnthologyList = () => {
 const router = useRouter();
  const isDark = useIsDarkTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetPublicAnthologies({ search: debouncedQuery });
  // Debounce search query to prevent excessive API calls
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  const anthologies = data?.pages.flatMap((page: any) => page?.data) || [];

  const handleReadMore = (anthology: IAppAnthology) => {
    router.push(`/anthology/${anthology._id}`);
  };


  const renderAnthology = ({ item }: { item: IAppAnthology }) => (
    <AnthologyCard anthology={item} onReadMore={handleReadMore} />
  );

  return (
    <ScreenLayout
      scafold={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        refreshControl: (
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
          />
        ),
      }}
      appBar={{
        title: "Anthologies",
      }}
    >
      <View className="px-4 pt-4 pb-2">
        <Searchbar
          onChangeText={setSearchQuery}
          value={searchQuery}
          inputStyle={{
            fontSize: 14,
            margin: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            minHeight: 0,
            color: isDark ? Colors.dark.primary : Colors.light.primary,
            textAlignVertical: "center",
          }}
          inputMode="search"
          style={{
            width: "100%",
            height: 48,
            borderRadius: 6,
            padding: 0,
            justifyContent: "center",
            backgroundColor: isDark ? "black" : "white",
            overflow: "hidden", // Prevent clipping issues
            borderColor: Colors.light.borderColor,
            borderWidth: isDark ? 0 : 1,
          }}
          iconColor={isDark ? Colors.dark.primary : Colors.light.primary}
          rippleColor="transparent"
          placeholder="Search"
          placeholderTextColor="#aaa"
          searchAccessibilityLabel="Search"
        />
      </View>
      <FlatList
        data={anthologies}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={renderAnthology}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <View>
              {[...Array(3)].map((_, i) => (
                <AnthologyCardShimmer key={i + "anthologyloading"} />
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
                <AnthologyCardShimmer key={i + "anthologyloadingFooter"} />
              ))}
            </View>
          ) : null
        }
      />
    </ScreenLayout>
  );
};