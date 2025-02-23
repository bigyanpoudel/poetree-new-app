import { ScrollView, useColorScheme, View, type ViewProps } from "react-native";

import { Colors } from "@/src/utils/constant/colors";

export type ScafoldProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  paddingVertical?: number;
};

export function Scafold({
  style,
  lightColor,
  darkColor,
  paddingVertical,
  ...otherProps
}: ScafoldProps) {
  const colorSchema = useColorScheme();
  const isDarked = colorSchema == "dark";
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
            paddingHorizontal: 20,
            paddingVertical: paddingVertical ?? 20,
            flex: 1,
            paddingBottom: 100,
          },
          style,
        ]}
        {...otherProps}
      />
    </ScrollView>
  );
}
