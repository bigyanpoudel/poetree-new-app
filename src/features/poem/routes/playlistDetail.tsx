import { ActionMenu } from "@/src/components/actionMenu";
import { ScreenLayout } from "@/src/components/layout";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import React from "react";
import { PlaylistContent } from "../components/playlist-detail/playlistContent";
import { PlaylistDetailSection } from "../components/playlist-detail/playlistDetailSection";
import { PlaylistSection } from "../components/playlist-detail/playlistSection";
import { PlayListTabs } from "../components/playlist-detail/playlistTabs";
import { PoemCommentSections } from "../components/poem-details/comments";
import { View } from "react-native";

export const PlaylistDetail = () => {
  return (
    <ScreenLayout
      scafold={{
        paddingHorizontal: 0,
        paddingVertical: 0,
      }}
      appBar={{
        title: "Playlist Details",
        action: (
          <ActionMenu
            anchorPosition="bottom"
            items={[
              {
                label: "Report Playlist",
                leadingIcon: (
                  <Octicons
                    name="report"
                    size={20}
                    a
                    className="dark:text-darkTextColor text-ligtTextColor"
                  />
                ),
                onPress: () => {},
              },
              {
                label: "Delete Playlist",
                leadingIcon: (
                  <Feather
                    name="trash"
                    size={20}
                    className="dark:text-darkTextColor text-ligtTextColor"
                  />
                ),
                onPress: () => {},
              },
              {
                label: "Edit Playlist",
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
      <PlayListTabs
        tabs={[1, 2, 3, 4, 5, 9, 9, 9, 2, 2, 3, 4]}
        activeTab={1}
        isLoading={false}
        handleTabChange={() => {}}
      />
      <PlaylistContent />
      <PlaylistDetailSection />
      <PlaylistSection />
      {/* <View className="mt-4 px-5 py-4 dark:bg-darker-100 bg-white flex flex-col flex-1">
        <PoemCommentSections />
      </View> */}
    </ScreenLayout>
  );
};
