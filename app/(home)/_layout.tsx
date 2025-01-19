import React from "react";
import { ExpoRouteTabs } from "@/src/components/expo-route-tabs";
import { ScreenProps } from "expo-router";
import { IconSymbol } from "@/src/components";
import { Obj } from "@/src/types";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import {} from "@expo/vector-icons";
export default function TabLayout() {
  const items: ScreenProps[] = [
    {
      name: "index",
      options: {
        title: "Home",
        tabBarIcon: ({ color }: Obj) => (
          <IconSymbol size={24} name="house.fill" color={color} />
        ),
      },
    },
    {
      name: "shop",
      options: {
        title: "Marketplace",
        tabBarIcon: ({ color }: Obj) => (
          <IconSymbol size={24} name="cart.fill" color={color} />
        ),
      },
    },
    {
      name: "network",
      options: {
        title: "Users",
        tabBarIcon: ({ color }: Obj) => (
          <IconSymbol size={24} name="person.fill" color={color} />
        ),
      },
    },
    {
      name: "explore",
      options: {
        title: "Explore",
        tabBarIcon: ({ color }: Obj) => (
          <IconSymbol size={24} name="map.fill" color={color} />
        ),
      },
    },
  ];

  return <ExpoRouteTabs items={items} />;
}
