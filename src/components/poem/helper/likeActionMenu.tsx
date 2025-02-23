import { Text } from "@/src/components/text";
import { REACTION_IMAGE } from "@/src/utils/constant/appConstant";
import { Colors } from "@/src/utils/constant/colors";
import { Feather } from "@expo/vector-icons";
import * as React from "react";
import { TouchableOpacity, useColorScheme, Image, View } from "react-native";
import { Menu } from "react-native-paper";
interface IActionMenuProps {
  onHandleReaction: (key: string) => void;
}
export const LikeActionMenu: React.FC<IActionMenuProps> = ({
  onHandleReaction,
}) => {
  const colorSchema = useColorScheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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
          className="flex flex-row gap-2 items-center"
        >
          <Feather
            name="heart"
            size={20}
            className="dark:text-darkTextColor text-ligtTextColor"
          />
          <Text className="text-sm font-semibold">1232</Text>
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
