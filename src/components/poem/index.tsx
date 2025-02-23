import { Text } from "@/src/components/text";
import { IAppPoem, POEMTYPE } from "@/src/types";
import { getPoemType } from "@/src/utils/poem";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, useColorScheme, View } from "react-native";
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
  const colorSchema = useColorScheme();

  const poemType: POEMTYPE = getPoemType({ ...poem });
  console.log("Poem-->", poem?.video);
  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-col gap-1">
        <Link href={`/poem/${poem.slug}`} asChild>
          <Text
            style={{
              fontFamily: "garamond",
            }}
            className="text-[28px] garamond -tracking-[0.5px]  font-bold "
          >
            Poem Title
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
        <View className="max-h-[280px] w-full">
          <Image
            source={{
              uri: "https://picsum.photos/400/500",
            }}
            className="h-full w-full object-contain"
          />
        </View>
      )}
      {poemType === POEMTYPE.video && poem.video && <VideoScreen />}
      <View className="flex flex-row gap-4 justify-between items-center">
        <View className="flex flex-row gap-2 flex-1">
          <Avatar.Text
            size={40}
            label="XD"
            labelStyle={{
              fontSize: 16,
              color: "white",
            }}
            className="dark:bg-black/50 bg-darkBackground "
          />
          <View className="flex flex-col">
            <Text className="text-base font-bold">User Name</Text>
            <Text className="text-sm text-gray-500">2021-10-10</Text>
          </View>
        </View>
        <ActionMenu
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
      </View>
      <PoemActions />
    </View>
  );
};
