import { Colors } from "@/src/utils/constant/colors";
import React from "react";
import { Appearance, Image, useColorScheme, View } from "react-native";
import { Appbar } from "react-native-paper";
import { Button } from "../button";
import { useRouter } from "expo-router";
export const MainAppBar = () => {
  const colorSchema = useColorScheme();
  const router = useRouter();
  const isDarkTheme = colorSchema === "dark";
  const toggleTheme = () => {
    if (isDarkTheme) {
      Appearance.setColorScheme("light");
    } else {
      Appearance.setColorScheme("dark");
    }
  };
  return (
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
      <Appbar.Content
        title={
          <Image
            source={
              isDarkTheme
                ? require("@/assets/images/poetree_logo_white.png")
                : require("@/assets/images/poetree_logo.png")
            }
            style={{
              width: 130,
              height: 40,
              resizeMode: "contain",
            }}
          />
        }
      />
      <View className="flex flex-row items-center justify-end gap-2">
        <View>
          <Appbar.Action
            style={{
              margin: 0,
              borderWidth: 1,
              borderRadius: "50%",
              padding: 0,
              borderColor: isDarkTheme
                ? Colors.dark.borderColor
                : Colors.light.borderColor,
            }}
            color={isDarkTheme ? Colors.dark.text : Colors.light.text}
            icon="magnify"
            onPress={() => {}}
          />
        </View>
        <Appbar.Action
          icon={isDarkTheme ? "brightness-3" : "brightness-7"}
          onPress={toggleTheme}
          color={isDarkTheme ? Colors.dark.text : Colors.light.text}
          style={{
            margin: 0,
            borderWidth: 1,
            borderRadius: "50%",
            padding: 0,
            borderColor: isDarkTheme
              ? Colors.dark.borderColor
              : Colors.light.borderColor,
          }}
        />
        <View>
          <Button
            onPress={() => {
              router.push("/signin");
            }}
            mode="contained"
            className="text-sm flex  text-center items-center "
            labelStyle={{
              fontSize: 14,
            }}
          >
            Signin
          </Button>
        </View>
      </View>
    </Appbar.Header>
  );
};
