import { Text } from "@/src/components/text";
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
import VideoScreen from "../videoPlayer";
import { PoemActions } from "./helper/poemActions";
import { PoemBody } from "./helper/poemBody";
import { RenderHashTag } from "./helper/poemHashTag";
import { PoemType } from "./helper/poemType";
interface IPoemProps {
  poem: IAppPoem;
}
export const Poem: React.FC<IPoemProps> = ({ poem }) => {
  const { user } = useAppProvider();
  const router = useRouter();
  const poemType: POEMTYPE = getPoemType({ ...poem });
  const actionItems = React.useMemo(() => {
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
        onPress: () => {},
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
  }, [poem, user]);

  return (
    <View className="flex flex-col p-4 px-5 gap-3 dark:bg-darker-100 bg-white/90">
      <View className="flex flex-col gap-1">
        <Link href={`/poem/${poem.slug}?name=${poem.title}`} asChild>
          <Text
            style={{
              fontFamily: "garamond",
              fontWeight: 800,
            }}
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
      {poem.body && <PoemBody poem={poem} />}
      {poem.hashTags && poem.hashTags.length && (
        <RenderHashTag hashtags={poem.hashTags} />
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
              {getCreatedDate(poem?.createdAt ?? "")}
            </Text>
          </View>
        </View>
        <ActionMenu items={actionItems} />
      </View>
      <PoemActions poem={poem} />
    </View>
  );
};
