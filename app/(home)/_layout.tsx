import React from "react";
import { ExpoRouteTabs } from "@/src/components/expo-route-tabs";
import { ScreenProps } from "expo-router";
import { IconSymbol } from "@/src/components";
import { Obj } from "@/src/types";
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
        title: "Shop",
        tabBarIcon: ({ color }: Obj) => (
          <IconSymbol size={24} name="cart.fill" color={color} />
        ),
      },
    },
  ];

  return <ExpoRouteTabs items={items} />;
}
