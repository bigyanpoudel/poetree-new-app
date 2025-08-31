import { Text } from "@/src/components/text";
import { useDeletePoem, useReport } from "@/src/hooks/useRootHook";
import { useAppProvider } from "@/src/provider/appProvider";
import { IAppPoem, POEMTYPE } from "@/src/types";
import { getPoemType } from "@/src/utils/poem";
import { getCreatedDate } from "@/src/utils/poemDateFormat";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { Avatar } from "react-native-paper";
import { ActionMenu } from "../actionMenu";
import { CustomDailog } from "../modal/dailog";
import { ReportComponent } from "../report";
import VideoScreen from "../videoPlayer";
import { PoemActions } from "./helper/poemActions";
import { PoemBody } from "./helper/poemBody";
import { RenderHashTag } from "./helper/poemHashTag";
import { PoemType } from "./helper/poemType";
interface IPoemProps {
  poem: IAppPoem;
}

// Memoize action items to prevent recreation on every render
const useActionItems = (poem: IAppPoem, user: any, router: any, setOpenDeleteModal: (open: boolean) => void, setOpenReportModal: (open: boolean) => void) => {
  return React.useMemo(() => {
    let items = [
      {
        label: "Details",
        leadingIcon: (
          <AntDesign
            name="eyeo"
            size={20}
            className="dark:text-darkTextColor text-ligtTextColor"
          />
        ),
        onPress: () => {
          router.push(`/poem/${poem.slug}?name=${poem.title}`);
        },
      },
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
    if (poem?.postedBy?._id == user?._id) {
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
            router.push(`/create-poem?id=${poem._id}`);
          },
        },
      ];
    }
    return items;
  }, [poem._id, poem.slug, poem.title, poem.postedBy?._id, user?._id, router, setOpenDeleteModal, setOpenReportModal]);
};

// Memoize style objects
const titleStyle = {
  fontFamily: "garamond",
  fontWeight: 800,
} as const;

export const Poem: React.FC<IPoemProps> = React.memo(({ poem }) => {
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openReportModal, setOpenReportModal] = React.useState<boolean>(false);
  const { user } = useAppProvider();
  const deletePoem = useDeletePoem();
  const router = useRouter();
  const reportPoem = useReport();
  const poemType: POEMTYPE = getPoemType({ ...poem });
  
  const actionItems = useActionItems(poem, user, router, setOpenDeleteModal, setOpenReportModal);

  return (
    <View>
      <View className="flex flex-col p-4 px-5 gap-3 dark:bg-darker-100 bg-white/90">
        <View className="flex flex-col gap-1">
          <Link href={`/poem/${poem.slug}?name=${poem.title}`} asChild>
            <Text
              style={titleStyle}
              className="text-[24px] garamond -tracking-[0.5px]  font-bold "
              numberOfLines={2}
            >
              {poem.title}
            </Text>
          </Link>
          <PoemType
            isAudio={Boolean(poem?.audio)}
            isVideo={Boolean(poem?.video)}
          />
        </View>
        {poem.body && (
          <PoemBody
            poem={poem}
            onShowMore={() => {
              router.push(`/poem/${poem.slug}?name=${poem.title}`);
            }}
            maxLines={5}
          />
        )}
        {poem.hashTags && poem.hashTags.length > 0 && (
          <RenderHashTag hashtags={poem.hashTags} title={poem?._id ?? ""} />
        )}
        {poemType === POEMTYPE.image && poem.thumbnail && (
          <Link href={`/poem/${poem.slug}?name=${poem.title}`} asChild>
            <View className="max-h-[280px] w-full">
              <Image
                source={{
                  uri: poem.thumbnail,
                }}
                className="h-full w-full object-contain"
              />
            </View>
          </Link>
        )}
        {poemType === POEMTYPE.video && poem.video && (
          <VideoScreen url={poem.video} />
        )}
        <View className="flex flex-row gap-4 mt-2 justify-between items-center">
          <View className="flex flex-row gap-2 flex-1">
            <Link
              href={`/user/${poem?.postedBy?._id}?slug=${poem?.postedBy?.slug}`}
            >
              {poem?.postedBy?.photo ? (
                <Avatar.Image
                  size={40}
                  source={{ uri: poem?.postedBy?.photo }}
                  className="w-[40px] h-[40px] rounded-full border border-ui-border dark:border-ui-border/20"
                />
              ) : (
                <Avatar.Text
                  size={40}
                  label={poem?.postedBy.name?.charAt(0) ?? ""}
                  labelStyle={{
                    fontSize: 16,
                    color: "white",
                  }}
                  className="dark:bg-black/50 bg-darkBackground "
                />
              )}
            </Link>
            <View className="flex flex-col">
              <Link
                href={`/user/${poem?.postedBy?._id}?slug=${poem?.postedBy?.slug}`}
              >
                <Text fontWeight={600} className="text-base font-bold">
                  {poem?.postedBy.name}
                </Text>
              </Link>
              <Text className="text-sm text-gray-500">
                {getCreatedDate(poem?.createdAt ?? poem.updatedAt)}
              </Text>
            </View>
          </View>
          <ActionMenu items={actionItems} />
        </View>
        <PoemActions poem={poem} />
      </View>
      {openDeleteModal && (
        <CustomDailog
          visible={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
          }}
          onConfirm={() => {
            deletePoem.mutate(poem._id);
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
                  type: "post",
                  reportTo: poem?._id,
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
    </View>
  );
});
