import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import React from "react";
import { FlatList, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { UserItem } from "./userItem";
import { Scafold } from "@/src/components";

export const FollowingList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const isDark = useIsDarkTheme();

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
          data={[1, 2, 3, 5]}
          renderItem={() => <UserItem />}
          // keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    </Scafold>
  );
};
