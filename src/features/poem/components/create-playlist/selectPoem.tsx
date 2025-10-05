import { Text } from "@/src/components";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { IAppPoem } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, View } from "react-native";
import { IconButton, Searchbar, TouchableRipple } from "react-native-paper";
import { useGetPoemSelectOption } from "../../hooks/createPlaylist";
interface ISelectPoemProps {
  poems: IAppPoem[];
  setSelectedPoem: (args: any) => void;
}
export const SelectPoem: React.FC<ISelectPoemProps> = ({
  poems,
  setSelectedPoem,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const isDark = useIsDarkTheme();
  const poemsList = useGetPoemSelectOption({ search: searchQuery });
  const poemsListOption = React.useMemo(() => {
    if (poemsList.data) {
      const listIds = poems.map((item: any) => item._id);
      return poemsList.data.data.filter((poem) => !listIds.includes(poem._id));
    }
    return [];
  }, [poems, poemsList]);
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
        data={poemsListOption}
        renderItem={({ item }) => (
          <PoemItem
            title={item.title}
            onPress={() => {
              setSelectedPoem(item);
            }}
            key={item._id}
          />
        )}
        // keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        ListFooterComponent={
          poemsList.isLoading || poemsList.isFetching ? (
            <View className="gap-4 px-3 mt-2">
              <PoemItemShimmer />
              <PoemItemShimmer />
              <PoemItemShimmer />
            </View>
          ) : null
        }
      />
    </View>
  );
};
interface IPoemItemProps {
  title: string;
  onPress: () => void;
}
const PoemItem: React.FC<IPoemItemProps> = ({ title, onPress }) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(0, 0, 0, .32)"
      className="py-1 px-3"
    >
      <View className="flex flex-row flex-1 justify-between items-center   gap-3">
        <View className="flex flex-col w-[70%]">
          <Text className="text-lg" numberOfLines={2}>
            {title}
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

const PoemItemShimmer: React.FC = () => {
  return (
    <View className="">
      <View className="flex flex-row justify-between items-center gap-3">
        {/* Title lines (70% width) */}
        <View className="w-[70%] flex flex-col gap-1">
          <View className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
          <View className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-[90%]" />
        </View>

        {/* Icon placeholder */}
        <View className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </View>
    </View>
  );
};
