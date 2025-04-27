import { ScreenLayout } from "@/src/components/layout";
import { Colors } from "@/src/utils/constant/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { useColorScheme, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { FollowerList } from "../components/follower/followerList";
import { FollowingList } from "../components/follower/followingList";

const Tab = createMaterialTopTabNavigator();

export const FollowerScreen = () => {
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
        title: "User Name",
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
          name="400 Followers"
          children={FollowerList}
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
          name="500 Following"
          children={FollowingList}
          // component={HomeYourFeed}
          options={{
            // tabBarIcon: ({ color }) => (
            //   <IconSymbol name="house.fill" color={color} size={24} />
            // ),
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
      </Tab.Navigator>
    </ScreenLayout>
  );
};
