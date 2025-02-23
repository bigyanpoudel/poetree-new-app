import { Colors } from "@/src/utils/constant/colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as React from "react";
import { useColorScheme } from "react-native";
import { Button, Divider, IconButton, Menu } from "react-native-paper";
interface IActionMenuProps {
  items: {
    label: string;
    leadingIcon: React.ReactNode;
    onPress: () => void;
  }[];
  anchorPosition?: "bottom" | "top" | undefined;
}
export const ActionMenu: React.FC<IActionMenuProps> = ({
  items,
  anchorPosition,
}) => {
  const colorSchema = useColorScheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      anchorPosition={anchorPosition}
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={{
        backgroundColor:
          colorSchema == "dark" ? Colors.dark.scafoldColor : "white",
      }}
      anchor={
        <Feather
          onPress={openMenu}
          name="more-vertical"
          size={20}
          className="dark:text-darkTextColor text-ligtTextColor"
        />
      }
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            <Menu.Item
              onPress={item.onPress}
              leadingIcon={() => item.leadingIcon}
              titleStyle={{
                fontSize: 16,
                fontWeight: "600",
                color:
                  colorSchema == "dark" ? Colors.dark.text : Colors.light.text,
              }}
              title={item.label}
            />
            {!isLast && <Divider />}
          </React.Fragment>
        );
      })}
    </Menu>
  );
};
