import { ActionMenu } from "@/src/components/actionMenu";
import { ScreenLayout } from "@/src/components/layout";
import { PoemActions } from "@/src/components/poem/helper/poemActions";
import { PoemBody } from "@/src/components/poem/helper/poemBody";
import { POEMS } from "@/src/utils/constant/appConstant";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import React from "react";
import { Divider } from "react-native-paper";
import { PoemHeader } from "../components/poem-details/poem-header";
import { PoemCommentSections } from "../components/poem-details/comments";

export const PoemDetail = () => {
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
                    size={20}a
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
      <PoemHeader />
      <PoemBody poem={POEMS[0]} maxLines={0} />
      <Divider className="my-6" />
      <PoemActions />
      <Divider className="my-6" />
      <PoemCommentSections />
    </ScreenLayout>
  );
};
