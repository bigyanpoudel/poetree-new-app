import { ActionMenu } from "@/src/components/actionMenu";
import { ScreenLayout } from "@/src/components/layout";
import { PoemActions } from "@/src/components/poem/helper/poemActions";
import { PoemBody } from "@/src/components/poem/helper/poemBody";
import { PoemMedia } from "@/src/components/poem/helper/poemMedia";
import { useAppProvider } from "@/src/provider/appProvider";
import { IAppPoem } from "@/src/types";
import { Feather, Octicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { RefreshControl, View } from "react-native";
import { Divider } from "react-native-paper";
import { PoemCommentSections } from "../components/poem-details/comments";
import { PoemHeader } from "../components/poem-details/poem-header";
import { PoemDetailShimmer } from "../components/poem-details/shimmer/poemDetailShimmer";
import { useGetPoemDetails, useUpdatePoemViewCount } from "../hooks/poemDetail";
import { useDeletePoem, useReport } from "@/src/hooks/useRootHook";
import { CustomDailog } from "@/src/components/modal/dailog";
import { ReportComponent } from "@/src/components/report";

export const PoemDetail = () => {
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openReportModal, setOpenReportModal] = React.useState<boolean>(false);
  const { name, id } = useLocalSearchParams<{ id: string; name: string }>();
  const { isLoading, data, refetch, isRefetching } = useGetPoemDetails(id);
  const { user } = useAppProvider();
  const router = useRouter();
  const deletePoem = useDeletePoem();
  const reportPoem = useReport();

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
        onPress: () => {
          setOpenReportModal(true);
        },
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
          onPress: () => {
            setOpenDeleteModal(true);
          },
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
          onPress: () => {
            router.push(`/create-poem?id=${data?._id}`);
          },
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
            <PoemMedia poem={data as IAppPoem} />
            
          <Divider className="my-6" />
          <PoemActions poem={data as IAppPoem} />
          <Divider className="my-6" />
          <PoemCommentSections id={data?._id as string} />
        </>
      )}
      {openDeleteModal && (
        <CustomDailog
          visible={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
          }}
          onConfirm={async () => {
            await deletePoem.mutateAsync(data?._id);
            router.back();
          }}
          isLoading={deletePoem.isPending}
          title="Are you sure you want to delete poem?"
          content={
            "This action cannot be undone. This will permanently delete the poem."
          }
        />
      )}
      {openReportModal && (
        <CustomDailog
          visible={openReportModal}
          onClose={() => {
            setOpenReportModal(false);
          }}
          onConfirm={() => {
            setOpenReportModal(false);
          }}
          title=""
          content={""}
          body={
            <ReportComponent
              onConfirm={async (reason) => {
                if (reportPoem.isPending) return;
                setOpenReportModal(false);
                const payload = {
                  type: "poem",
                  reportTo: data?._id,
                  reportType: reason,
                };
                reportPoem.mutateAsync(payload);
                setOpenReportModal(false);
              }}
              isUser={false}
            />
          }
          isHIdeOk
          isHideCancel={true}
          okText="Cancel"
        />
      )}
    </ScreenLayout>
  );
};
