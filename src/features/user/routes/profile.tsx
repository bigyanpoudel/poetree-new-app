import { ActionMenu } from "@/src/components/actionMenu";
import { ScreenLayout } from "@/src/components/layout";
import { Colors } from "@/src/utils/constant/colors";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { ProfileCard } from "../components";
import { ListPeoms } from "../components/list-poems";
import { ListPlaylist } from "../components/list-playlist";

const Tab = createMaterialTopTabNavigator();

export const ProfileScreen = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  const colorScheme = useColorScheme();
  const isDark = colorScheme == "dark";
  return (
    <ScreenLayout
      scafold={{
        paddingHorizontal: 0,
      }}
      appBar={{
        title: "Profile",
        action: (
          <ActionMenu
            anchorPosition="bottom"
            items={[
              {
                label: "Report User",
                leadingIcon: (
                  <Octicons
                    name="report"
                    size={20}
                    className="dark:text-darkTextColor text-ligtTextColor"
                  />
                ),
                onPress: () => {},
              },
              {
                label: "Edit Profile",
                leadingIcon: (
                  <Feather
                    name="edit"
                    size={20}
                    className="dark:text-darkTextColor text-ligtTextColor"
                  />
                ),
                onPress: () => {},
              },
            ]}
          />
        ),
      }}
    >
      <ProfileCard
        user={{
          _id: "456",
          name: "John Doe",
          slug: "john_doe",
          photo: "", // or set a photo URL here
          about:
            "Lover of words and rhythm. Sharing pieces of my soul through poetry.",
          followingCount: 128,
          followersCount: 420,
          isFollowing: false,
          createdAt: new Date().toISOString(),
          email: "johndoe@example.com",
          expiryDate: new Date().toISOString(),
          isActive: true,
          role: "user",
          updatedAt: new Date().toISOString(),
          platformAccess: "",
          followings: [],
          followers: [],
        }}
      />
      <View className="h-[24px]"></View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 24,
          backgroundColor: isDark ? Colors.light.primary : Colors.dark.primary,
        }}
      >
        {["all", "playlist"].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: 12,
              borderBottomWidth: activeTab === tab ? 2 : 0,
              borderColor: isDark ? Colors.dark.primary : Colors.light.primary,
              alignItems: "center",
            }}
          >
            <Text
              className="text-red-400"
              style={{
                color:
                  activeTab === tab
                    ? isDark
                      ? Colors.dark.primary
                      : Colors.light.primary
                    : isDark
                    ? "rgba(255,255,255,0.5)"
                    : "rgb(0,0,0,0.6)",
                fontFamily: "Poximanova",
                fontSize: 14,
              }}
            >
              {tab === "all" ? "All Poems" : "Playlist"}
            </Text>
          </Pressable>
        ))}
      </View>
      {activeTab == "all" && <ListPeoms />}
      {activeTab == "playlist" && <ListPlaylist />}
    </ScreenLayout>
  );
};
