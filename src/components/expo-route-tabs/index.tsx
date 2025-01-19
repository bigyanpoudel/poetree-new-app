import { ScreenProps, Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/src/utils/constant/colors";
import { HapticTab } from "./helper/haptic-tab";
interface IExpoRouteTabsProps {
  items: ScreenProps[];
}

export const ExpoRouteTabs: React.FC<IExpoRouteTabsProps> = ({ items }) => {
  const colorScheme = useColorScheme();

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
            backgroundColor: Colors[colorScheme ?? "light"].background,
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
