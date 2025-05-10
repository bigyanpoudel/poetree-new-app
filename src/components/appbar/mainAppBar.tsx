import { useGetCurrentUser } from "@/src/hooks/useRootHook";
import { useAppProvider } from "@/src/provider/appProvider";
import { Colors } from "@/src/utils/constant/colors";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Appearance, Image, useColorScheme, View } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { Button } from "../button";
export const MainAppBar = () => {
  const colorSchema = useColorScheme();
  const router = useRouter();
  const { user } = useAppProvider();
  const currentUser = useGetCurrentUser();
  console.log("currentUser", currentUser.data);
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
            onPress={() => {
              router.navigate("/search");
            }}
          />
        </View>
        {user?._id ? (
          <Appbar.Action
            icon={"plus"}
            onPress={() => {
              router.push("/create-poem");
            }}
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
        ) : (
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
        )}
        <View>
          {!user && (
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
          )}
          {user?._id && (
            <Link href={`/user/${user?._id}?slug=${currentUser.data?.slug}`}>
              {currentUser?.data?.photo ? (
                <Avatar.Image
                  size={40}
                  source={{ uri: currentUser?.data?.photo }}
                  className="w-[40px] h-[40px] rounded-full border border-ui-border dark:border-ui-border/20"
                />
              ) : (
                <Avatar.Text
                  size={40}
                  label={
                    currentUser?.data?.name
                      ? currentUser?.data?.name.charAt(0)
                      : ""
                  }
                  labelStyle={{
                    fontSize: 16,
                    color: "white",
                  }}
                  className="dark:bg-black/50 dark:border  dark:border-ui-border/90 bg-darker-100 "
                />
              )}
            </Link>
          )}
        </View>
      </View>
    </Appbar.Header>
  );
};
