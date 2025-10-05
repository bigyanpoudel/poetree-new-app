import { Text } from "@/src/components/text";
import { usePoemLike } from "@/src/hooks/useRootHook";
import { useAppProvider } from "@/src/provider/appProvider";
import { IAppPoem, Obj } from "@/src/types";
import { REACTION_IMAGE } from "@/src/utils/constant/appConstant";
import { Colors } from "@/src/utils/constant/colors";
import { formatPoemNumber } from "@/src/utils/poem";
import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import { Menu } from "react-native-paper";
interface IActionMenuProps {
  poemCount?: number;
  poem?: IAppPoem;
}
export const LikeActionMenu: React.FC<IActionMenuProps> = ({
  poemCount,
  poem,
}) => {
  const colorSchema = useColorScheme();
  const [visible, setVisible] = React.useState(false);
  const [count, setCount] = React.useState<number>(poemCount ?? 0);
  const [reaction, setReaction] = React.useState<Obj>(poem?.userLike ?? {});
  const likePoem = usePoemLike();
  const { user } = useAppProvider();
  React.useEffect(() => {
    if (poem?.userLike) {
      setReaction(poem.userLike);
    }
  }, [poem]);

  React.useEffect(() => {
    setCount(poemCount ?? 0);
  }, [poemCount]);

  const openMenu = () => {
    if (likePoem.isPending) return;
    setVisible(true);
  };
  const closeMenu = () => setVisible(false);
  const onHandleReaction = (key: string) => {
    if (!user?._id) {
      return;
    }
    if (!reaction?.type || reaction?.type !== key) {
      likePoem.mutate({
        id: poem?._id as string,
        body: {
          type: key,
        },
      });
      setReaction({
        type: key,
      });
      if (!reaction?.type) {
        setCount((prev: number) => prev + 1);
      }
    } else {
      likePoem.mutate({
        id: poem?._id as string,
        body: {},
      });
      setCount((prev: number) => prev - 1);
      setReaction({});
    }
  };
  return (
    <Menu
      anchorPosition={"bottom"}
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={{
        width: "auto",
        backgroundColor:
          colorSchema == "dark" ? Colors.dark.scafoldColor : "white",
      }}
      anchor={
        <TouchableOpacity
          onPress={openMenu}
          disabled={likePoem.isPending}
          className="flex flex-row gap-2 items-center"
        >
          {reaction?.type ? (
            <Image
              className="h-5 w-5"
              source={{
                uri: REACTION_IMAGE[reaction?.type],
              }}
            />
          ) : (
            <Feather
              name="heart"
              size={20}
              className="dark:text-darkTextColor text-ligtTextColor"
            />
          )}
          <Text className="text-sm font-semibold">
            {formatPoemNumber(count)}
          </Text>
        </TouchableOpacity>
      }
    >
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 6,
          gap: 16,
          paddingHorizontal: 12,
        }}
      >
        {Object.entries(REACTION_IMAGE).map(([key, value]) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                closeMenu();
                onHandleReaction(key);
              }}
            >
              <Image
                key={key}
                className="h-8 w-8"
                source={{
                  uri: value,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Menu>
  );
};
