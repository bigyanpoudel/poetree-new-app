import { ExpoRouteTabs } from "@/src/components/expo-route-tabs";
import { useAppProvider } from "@/src/provider/appProvider";
import { Obj } from "@/src/types";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { ScreenProps } from "expo-router";
import React from "react";
export default function TabLayout() {
  const { user } = useAppProvider();
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
      name: "feed",
      options: {
        title: "Feed",
        tabBarIcon: ({ color }: Obj) => (
          <Entypo name="network" size={24} color={color} />
        ),
      },
    },
    {
      name: "shop",
      options: {
        title: "Shop",
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
  console.log("items", items);
  return <ExpoRouteTabs items={items} />;
}
