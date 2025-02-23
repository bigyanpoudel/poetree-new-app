import { Colors } from "@/src/utils/constant/colors";
import { router } from "expo-router";
import React from "react";
import { useColorScheme, View } from "react-native";
import { Appbar } from "react-native-paper";
import { Scafold } from "../view/Scafold";
interface IScreenLayoutProps {
  appBar: {
    title: string;
    action?: React.ReactNode;
  };
  children: React.ReactNode;
}
export const ScreenLayout: React.FC<IScreenLayoutProps> = ({
  appBar,
  children,
}) => {
  const colorSchema = useColorScheme();
  const isDarkTheme = colorSchema === "dark";
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{
          paddingLeft: 0,
          paddingRight: 16,
          gap: 0,

          backgroundColor: isDarkTheme
            ? Colors.light.primary
            : Colors.dark.primary,
          // iOS shadow
        }}
        mode="small"
      >
        <Appbar.BackAction
          color={isDarkTheme ? Colors.dark.text : Colors.light.text}
          onPress={() => {
            router.back();
          }}
        />
        <Appbar.Content
          color={isDarkTheme ? Colors.dark.text : Colors.light.text}
          titleStyle={{
            fontSize: 16,
            fontWeight: "700",
          }}
          title={appBar.title}
        />
        {appBar.action}
      </Appbar.Header>
      <Scafold>{children}</Scafold>
    </View>
  );
};
