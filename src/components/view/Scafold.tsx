import { ScrollView, useColorScheme, View, type ViewProps } from "react-native";

import { Colors } from "@/src/utils/constant/colors";

export type ScafoldProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Scafold({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ScafoldProps) {
  const colorSchema = useColorScheme();
  const isDarked = colorSchema == "dark";
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={[
          {
            backgroundColor: isDarked
              ? Colors.dark.scafoldColor
              : Colors.light.scafoldColor,
            paddingHorizontal: 20,
            paddingVertical: 24,
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
