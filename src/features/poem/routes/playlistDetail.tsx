import { ActionMenu } from "@/src/components/actionMenu";
import { ScreenLayout } from "@/src/components/layout";
import { useAppProvider } from "@/src/provider/appProvider";
import { IAppPoem } from "@/src/types";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { RefreshControl, View } from "react-native";
import { PlaylistCommentSections } from "../components/playlist-detail/comments";
import { PlaylistContent } from "../components/playlist-detail/playlistContent";
import { PlaylistDetailSection } from "../components/playlist-detail/playlistDetailSection";
import { PlayListTabs } from "../components/playlist-detail/playlistTabs";
import { PoemDetailShimmer } from "../components/poem-details/shimmer/poemDetailShimmer";
import { useGetPlaylistDetails } from "../hooks/palylistDetails";

export const PlaylistDetail = () => {
  const [activePoem, setActivePoem] = React.useState<IAppPoem>();
  const [activeIndex, setActiveIndex] = React.useState<number>(1);
  const { name, id } = useLocalSearchParams<{ id: string; name: string }>();
  const { isLoading, data, refetch, isRefetching } = useGetPlaylistDetails(id);
  const { user } = useAppProvider();
  const router = useRouter();
  React.useEffect(() => {
    if (data?.poems && activeIndex === 1) {
      setActivePoem(data.poems[activeIndex - 1]);
    }
  }, [data?.poems]);

  const handlePoemChange = (index: number) => {
    const oldPoems = data?.poems ?? [];
    const poems = [...oldPoems];
    const activePoem = poems[index - 1];
    setActivePoem(activePoem);
    setActiveIndex(index);
  };
  console.log("playlist Details -->", name, id);
  const actionItems = React.useMemo(() => {
    let items: any[] = [];
    if (data?.createdBy?._id == user?._id) {
      items = [
        ...items,
        {
          label: "Edit Playlist",
          leadingIcon: (
            <Feather
              name="edit"
              size={20}
              className="dark:text-darkTextColor text-ligtTextColor"
            />
          ),
          onPress: () => {
            router.push(`/create-playlist?id=${data?._id}`);
          },
        },
      ];
    }
    return items;
  }, [data, user]);
  return (
    <ScreenLayout
      scafold={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        refreshControl: (
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
          />
        ),
      }}
      appBar={{
        title: name ?? "Playlist Details",
        action: <ActionMenu anchorPosition="bottom" items={actionItems} />,
      }}
    >
      {isLoading ? (
        <PoemDetailShimmer />
      ) : (
        <>
          <PlayListTabs
            tabs={Array.from(
              { length: data?.poems?.length ?? 1 },
              (_, index) => index + 1
            )}
            isLoading={isLoading}
            handleTabChange={handlePoemChange}
            activeTab={activeIndex}
          />
          {activePoem && (
            <PlaylistContent
              isLocked={data?.isLocked}
              poem={activePoem}
              price={data?.price}
              number={activeIndex}
              playlist={data}
            />
          )}

          <PlaylistDetailSection playlist={data} />
          <View className="mt-4 px-5 py-4 dark:bg-darker-100 bg-white flex flex-col flex-1">
            <PlaylistCommentSections id={data?._id as string} />
          </View>
        </>
      )}
    </ScreenLayout>
  );
};
