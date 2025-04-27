import React from "react";
import { ExpoRouteTabs } from "@/src/components/expo-route-tabs";
import { ScreenProps } from "expo-router";
import { IconSymbol } from "@/src/components";
import { Obj } from "@/src/types";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
export default function TabLayout() {
  const items: ScreenProps[] = [
    {
      name: "index",
      options: {
        title: "Home",
        tabBarIcon: ({ color }: Obj) => (
          <Entypo name="home" size={24} color={color} />
        ),
      },
    },
    {
      name: "shop",
      options: {
        title: "Marketplace",
        tabBarIcon: ({ color }: Obj) => (
          <Entypo name="shop" size={24} color={color} />
        ),
      },
    },
    {
      name: "explore",
      options: {
        title: "Explore",
        tabBarIcon: ({ color }: Obj) => (
          <MaterialIcons name="explore" size={24} color={color} />
        ),
      },
    },
    {
      name: "account",
      options: {
        title: "More",
        tabBarIcon: ({ color }: Obj) => (
          <MaterialIcons name="dashboard" size={24} color={color} />
        ),
      },
    },
  ];

  return <ExpoRouteTabs items={items} />;
}
