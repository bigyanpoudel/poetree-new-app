import { ScreenProps, Tabs } from "expo-router";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

import { Colors } from "@/src/utils/constant/colors";
import { HapticTab } from "./helper/haptic-tab";
import TabBarBackground from "./helper/tab-bar-background/TabBarBackground";
interface IExpoRouteTabsProps {
  items: ScreenProps[];
}

export const ExpoRouteTabs: React.FC<IExpoRouteTabsProps> = ({ items }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme == "dark";
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        headerShown: false,
        tabBarButton: (props) => (
          <View style={styles.tabContainer}>
            {props.accessibilityState?.selected && (
              <View
                style={[
                  styles.activeIndicator,
                  { backgroundColor: Colors[colorScheme ?? "light"].primary },
                ]}
              />
            )}
            <HapticTab {...props} />
          </View>
        ),
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: isDark
              ? Colors[colorScheme ?? "light"].background
              : "white",
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarBackground: TabBarBackground,
      }}
    >
      {items.map((tab) => (
        <Tabs.Screen key={tab.name} {...tab} />
      ))}
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8, // For Android
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 4,
    fontFamily: "Poximanova",
  },
  tabBarIcon: {
    marginBottom: -4,
  },
  tabContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
    gap: 10,
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    height: 2,
    width: "80%",
    borderRadius: 2,
  },
});
