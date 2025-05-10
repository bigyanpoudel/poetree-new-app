import { ActionMenu } from "@/src/components/actionMenu";
import { ScreenLayout } from "@/src/components/layout";
import { PoemActions } from "@/src/components/poem/helper/poemActions";
import { PoemBody } from "@/src/components/poem/helper/poemBody";
import { useAppProvider } from "@/src/provider/appProvider";
import { IAppPoem } from "@/src/types";
import { Feather, Octicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { RefreshControl } from "react-native";
import { Divider } from "react-native-paper";
import { PoemCommentSections } from "../components/poem-details/comments";
import { PoemHeader } from "../components/poem-details/poem-header";
import { PoemDetailShimmer } from "../components/poem-details/shimmer/poemDetailShimmer";
import { useGetPoemDetails, useUpdatePoemViewCount } from "../hooks/poemDetail";

export const PoemDetail = () => {
  const { name, id } = useLocalSearchParams<{ id: string; name: string }>();
  const { isLoading, data, refetch, isRefetching } = useGetPoemDetails(id);
  const { user } = useAppProvider();
  useUpdatePoemViewCount({
    id: data?._id ?? "",
  });

  const actionItems = React.useMemo(() => {
    let items = [
      {
        label: "Report Poem",
        leadingIcon: (
          <Octicons
            name="report"
            size={20}
            className="dark:text-darkTextColor text-ligtTextColor"
          />
        ),
        onPress: () => {},
      },
    ];
    if (data?.postedBy?._id == user?._id) {
      items = [
        ...items,
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
      ];
    }
    return items;
  }, [data, user]);
  return (
    <ScreenLayout
      appBar={{
        title: name ?? "Poem Details",
        action: <ActionMenu anchorPosition="bottom" items={actionItems} />,
      }}
      scafold={{
        refreshControl: (
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
          />
        ),
      }}
    >
      {isLoading ? (
        <PoemDetailShimmer />
      ) : (
        <>
          <PoemHeader poem={data} />
          <PoemBody poem={data as IAppPoem} maxLines={0} />
          <Divider className="my-6" />
          <PoemActions poem={data as IAppPoem} />
          <Divider className="my-6" />
          <PoemCommentSections id={data?._id as string} />
        </>
      )}
    </ScreenLayout>
  );
};
