import { Colors } from "@/src/utils/constant/colors";
import React from "react";
import { useColorScheme } from "react-native";
import { List } from "react-native-paper";
import { Text } from "../text";
import { Style } from "react-native-paper/lib/typescript/components/List/utils";
interface ListItemProps {
  title: String;
  left: (props: any) => React.ReactNode;
  onPress: () => void;
  right?: (props: { color: string; style?: Style }) => React.ReactNode;
}
export const ListItem: React.FC<ListItemProps> = ({ left, ...props }) => {
  const colorSchema = useColorScheme();
  const isDark = colorSchema === "dark";
  return (
    <List.Item
      style={{
        height: 49,
      }}
      titleStyle={{
        fontWeight: 500,
        fontSize: 16,
        color: isDark ? Colors.dark.text : Colors.light.text,
      }}
      left={(props: any) =>
        left({ ...props, color: isDark ? Colors.dark.text : Colors.light.text })
      }
      {...props}
    />
  );
};
interface IListSubHeadingProps {
  children: React.ReactNode;
}
export const ListSubHeading: React.FC<IListSubHeadingProps> = ({
  children,
}) => {
  return (
    <List.Subheader className="dark:text-darkTextColor text-lg mb-1 pb-0  font-semibold">
      <Text className="text-xl font-bold"> {children}</Text>
    </List.Subheader>
  );
};
