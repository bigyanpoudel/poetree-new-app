import { Colors } from "@/src/utils/constant/colors";
import classnames from "classnames";
import React from "react";
import { useColorScheme } from "react-native";
import {
  IconButtonProps,
  IconButton as RNIconButton,
} from "react-native-paper";
interface IButtonProps extends IconButtonProps {}
export const IconButton: React.FC<IButtonProps> = ({ className, ...props }) => {
  const colorSchema = useColorScheme();
  const isDark = colorSchema === "dark";
  return (
    <RNIconButton
      containerColor={isDark ? Colors.dark.primary : Colors.light.primary}
      iconColor={isDark ? Colors.light.text : Colors.dark.text}
      className={classnames("rounded-full ", className)}
      {...props}
    />
  );
};
