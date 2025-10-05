import { Button, Text } from "@/src/components";
import { AudioPlayer } from "@/src/components/audioPlayer";
import { PoemBody } from "@/src/components/poem/helper/poemBody";
import { PurchaseState } from "@/src/components/state/purchaseState";
import VideoScreen from "@/src/components/videoPlayer";
import { useAppProvider } from "@/src/provider/appProvider";
import { IAppPlayList, IAppPoem, POEMTYPE } from "@/src/types";
import { getAccountFormatter } from "@/src/utils/currency";
import { getPoemType } from "@/src/utils/poem";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { usePurchasePlaylist } from "../../hooks/palylistDetails";
interface IPlaylistContentProps {
  number?: number;
  poem?: IAppPoem;
  isLocked?: boolean;
  price?: number;
  playlist?: IAppPlayList;
}
export const PlaylistContent: React.FC<IPlaylistContentProps> = ({
  number,
  poem,
  isLocked = false,
  price,
  playlist,
}) => {
  const router = useRouter();
  const { user } = useAppProvider();
  const purchasePlaylist = usePurchasePlaylist();
  const poemType: POEMTYPE = getPoemType({ ...poem });
  return (
    <View className="flex flex-col gap-4 mt-4  bg-white/90 dark:bg-darker-100 p-4 px-5">
      <View className="flex flex-row gap-3  ">
        <Avatar.Text
          size={30}
          label={number?.toString() || "1"}
          labelStyle={{
            fontSize: 14,
            color: "white",
          }}
          className="dark:bg-black/50 bg-darkBackground "
        />
        <View className="flex flex-col">
          <Text className="text-xl" fontWeight={700} numberOfLines={2}>
            {poem?.title}
          </Text>
        </View>
      </View>
      {isLocked ? (
        <View>
          <PurchaseState />
          <Button
            loading={purchasePlaylist.isPending}
            onPress={() => {
              if (user?._id) {
                purchasePlaylist.mutate({
                  playlistId: playlist?._id,
                });
              } else {
                router.push("/signin");
              }
            }}
            mode="contained"
          >
            Purchase {getAccountFormatter(price ?? 0)}
          </Button>
        </View>
      ) : (
        <>
          {poemType === POEMTYPE.video && poem?.video && (
            <VideoScreen url={poem.video} />
          )}
          {poemType === POEMTYPE.audio && poem?.audio && (
            <AudioPlayer uri={poem.audio} />
          )}
          {poem && <PoemBody poem={poem} maxLines={0} />}
        </>
      )}
    </View>
  );
};
