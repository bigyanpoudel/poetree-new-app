import React from "react";
import { PoemCommentSections } from "../components/poem-details/comments";
import { ScreenLayout } from "@/src/components/layout";
import { ActionMenu } from "@/src/components/actionMenu";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";

export const PlaylistDetail = () => {
  return (
    <ScreenLayout
      appBar={{
        title: "Poem Details",
        action: (
          <ActionMenu
            anchorPosition="bottom"
            items={[
              {
                label: "Details",
                leadingIcon: (
                  <AntDesign
                    name="eyeo"
                    size={20}
                    className="dark:text-darkTextColor text-ligtTextColor"
                  />
                ),
                onPress: () => {},
              },
              {
                label: "Report Poem",
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
                label: "Delete Poem",
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
                label: "Edit Poem",
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
      <PoemCommentSections />
    </ScreenLayout>
  );
};
