import { Scafold } from "@/src/components";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useGetUserFollowerList } from "../../hooks/user";
import { UserItem } from "./userItem";

export const FollowerList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { id } = useLocalSearchParams<{ id: string; slug: string }>();
  const isDark = useIsDarkTheme();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useGetUserFollowerList({ userId: id });
  const users = data?.pages.flatMap((page: any) => page?.data) || [];
  return (
    <Scafold isNormalView>
      <View className="flex flex-col gap-5">
        <Searchbar
          // autoFocus
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
          placeholder="Search poem"
          placeholderTextColor="#aaa"
          searchAccessibilityLabel="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />

        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            console.log("item---->", item);
            return <UserItem user={item} key={item._id} />;
          }}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          contentContainerStyle={{ paddingVertical: 16 }}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="gap-4 px-5 mt-2">
                {/* {[...Array(2)].map((_, i) => (
                         
                        ))} */}
              </View>
            ) : null
          }
        />
      </View>
    </Scafold>
  );
};
