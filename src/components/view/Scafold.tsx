import { ScrollView, useColorScheme, View, type ViewProps } from "react-native";

import { Colors } from "@/src/utils/constant/colors";

export type ScafoldProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  isNormalView?: boolean;
};

export function Scafold({
  style,
  lightColor,
  darkColor,
  paddingVertical,
  paddingHorizontal,
  isNormalView = false,
  ...otherProps
}: ScafoldProps) {
  const colorSchema = useColorScheme();
  const isDarked = colorSchema == "dark";
  if (isNormalView) {
    return (
      <View
        style={[
          {
            backgroundColor: isDarked
              ? Colors.dark.scafoldColor
              : Colors.light.scafoldColor,
            paddingHorizontal: paddingHorizontal ?? 20,
            paddingVertical: paddingVertical ?? 20,
            flex: 1,
            paddingBottom: 100,
            height: "100%",
          },
          style,
        ]}
        {...otherProps}
      />
    );
  }
  return (
    <ScrollView
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: isDarked
          ? Colors.dark.scafoldColor
          : Colors.light.scafoldColor,
      }}
    >
      <View
        style={[
          {
            backgroundColor: isDarked
              ? Colors.dark.scafoldColor
              : Colors.light.scafoldColor,
            paddingHorizontal: paddingHorizontal ?? 20,
            paddingVertical: paddingVertical ?? 20,
            flex: 1,
            paddingBottom: 100,
            height: "100%",
          },
          style,
        ]}
        {...otherProps}
      />
    </ScrollView>
  );
}
