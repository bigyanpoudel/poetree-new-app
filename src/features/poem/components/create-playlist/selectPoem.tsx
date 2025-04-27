import { Text } from "@/src/components";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, TextInput, View } from "react-native";
import { IconButton, Searchbar, TouchableRipple } from "react-native-paper";

export const SelectPoem = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const isDark = useIsDarkTheme();

  return (
    <View className="h-[80vh] flex flex-col gap-5">
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
        renderItem={() => <PoemItem />}
        // keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const PoemItem = () => {
  return (
    <TouchableRipple
      onPress={() => console.log("Pressed")}
      rippleColor="rgba(0, 0, 0, .32)"
      className="py-2 px-3"
    >
      <View className="flex flex-row flex-1 justify-between items-center  h-[38px] gap-3">
        <View className="flex flex-col">
          <Text className="text-lg" numberOfLines={2}>
            This is Poem Title
          </Text>
        </View>
        <IconButton
          icon={() => (
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              className="text-ligtTextColor dark:text-darkTextColor"
            />
          )}
        />
      </View>
    </TouchableRipple>
  );
};