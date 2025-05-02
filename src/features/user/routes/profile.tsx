import { ActionMenu } from "@/src/components/actionMenu";
import { ScreenLayout } from "@/src/components/layout";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { useGetCurrentUser } from "@/src/hooks/useRootHook";
import { Colors } from "@/src/utils/constant/colors";
import { Feather, Octicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { ProfileCard } from "../components";
import { ListPlaylist } from "../components/list-playlist";
import { ListPeoms } from "../components/list-poems";
import { useGetUserProfile } from "../hooks/user";

export const ProfileScreen = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  const { slug } = useLocalSearchParams<{ id: string; slug: string }>();
  const isDark = useIsDarkTheme();
  const user = useGetUserProfile();
  const currentUser = useGetCurrentUser();
  const actionMenu = React.useMemo(() => {
    let items = [];

    if (user.data?._id === currentUser.data?._id) {
      items.push({
        label: "Edit Profile",
        leadingIcon: (
          <Feather
            name="edit"
            size={20}
            className="dark:text-darkTextColor text-ligtTextColor"
          />
        ),
        onPress: () => {},
      });
    } else {
      items.push({
        label: "Report User",
        leadingIcon: (
          <Octicons
            name="report"
            size={20}
            className="dark:text-darkTextColor text-ligtTextColor"
          />
        ),
        onPress: () => {},
      });
    }
    return items;
  }, [user.data, currentUser.data]);
  return (
    <ScreenLayout
      scafold={{
        paddingHorizontal: 0,
      }}
      appBar={{
        title: slug ?? "Profile",
        action: <ActionMenu anchorPosition="bottom" items={actionMenu} />,
      }}
    >
      <ProfileCard />
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
