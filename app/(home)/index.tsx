import { IconSymbol } from "@/src/components";
import { MainAppBar } from "@/src/components/appbar/mainAppBar";
import { HomePoems } from "@/src/features/home/routes/poems";
import { HomeTrending } from "@/src/features/home/routes/trending";
import { HomeYourFeed } from "@/src/features/home/routes/yourFeed";
import { Colors } from "@/src/utils/constant/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { useColorScheme, View, Text } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme == "dark";
  return (
    <View
      style={{
        flex: 1, // This will ensure the container takes up the entire screen height
      }}
    >
      <MainAppBar />

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
          name="Poems"
          children={HomePoems}
          options={{
            tabBarIcon: ({ color }) => (
              <IconSymbol name="house.fill" color={color} size={24} />
            ),
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
        <Tab.Screen
          name="Feeds"
          children={HomeYourFeed}
          // component={HomeYourFeed}
          options={{
            tabBarIcon: ({ color }) => (
              <IconSymbol name="house.fill" color={color} size={24} />
            ),
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
        <Tab.Screen
          name="Trending"
          children={HomeTrending}
          options={{
            tabBarIcon: ({ color }) => (
              <IconSymbol name="person.fill" color={color} size={24} />
            ),
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
    </View>
  );
}
