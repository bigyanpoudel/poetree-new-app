import { ScreenLayout } from "@/src/components/layout";
import { Colors } from "@/src/utils/constant/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { useColorScheme } from "react-native";
import { Searchbar } from "react-native-paper";
import { SearchPaylist } from "../component/playlist";
import { SearchPoemList } from "../component/poems";
import { SearchUserList } from "../component/users";

const Tab = createMaterialTopTabNavigator();

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme == "dark";
  return (
    <ScreenLayout
      scafold={{
        isNormalView: true,
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingBottom: 0,
      }}
      appBar={{
        title: "Search",
        action: (
          <Searchbar
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
              width: "85%",
              height: 38,
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
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        ),
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
          tabBarInactiveTintColor:
            Colors[colorScheme ?? "light"].tabIconDefault,
          tabBarStyle: {
            maxHeight: 80,
            backgroundColor: isDark
              ? Colors.light.primary
              : Colors.dark.primary,
          },
        }}
      >
        <Tab.Screen
          name="Users"
          children={() => <SearchUserList search={searchQuery} />}
          options={{
            tabBarItemStyle: {
              flexDirection: "row", // Align the icon and label horizontally
              alignItems: "center",
              display: "flex",
            },
            tabBarLabelStyle: {
              fontFamily: "Poximanova",
            },
            tabBarIndicatorStyle: {
              backgroundColor: Colors[colorScheme ?? "light"].primary,
            },
          }}
        />
        <Tab.Screen
          name="Poems"
          children={() => <SearchPoemList search={searchQuery} />}
          options={{
            tabBarItemStyle: {
              flexDirection: "row", // Align the icon and label horizontally
              alignItems: "center",
              display: "flex",
            },
            tabBarLabelStyle: {
              fontFamily: "Poximanova",
            },
            tabBarIndicatorStyle: {
              backgroundColor: Colors[colorScheme ?? "light"].primary,
            },
          }}
        />
        <Tab.Screen
          name="Playlist"
          children={() => <SearchPaylist search={searchQuery} />}
          options={{
            tabBarLabelStyle: {
              fontFamily: "Poximanova",
            },
            tabBarItemStyle: {
              flexDirection: "row", // Align the icon and label horizontally
              alignItems: "center",
              display: "flex",
            },
            tabBarIndicatorStyle: {
              backgroundColor: Colors[colorScheme ?? "light"].primary,
            },
          }}
        />
      </Tab.Navigator>
    </ScreenLayout>
  );
};
