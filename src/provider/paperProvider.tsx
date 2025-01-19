import * as React from "react";
import { useColorScheme } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider as RNPaperpProvider,
} from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { Colors } from "../utils/constant/colors";

const darkTheme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "white",
    onPrimary: "#1E1E1E",
    background: "#151718",
    onBackground: "white",
    surface: "#151718",
  },
};

const lightTheme: ThemeProp = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1E1E1E",
    onPrimary: "white",
    background: "white",
    onBackground: "#1E1E1E",
    onSurface: "#1E1E1E",
    backdrop: "red",
    surface: "white",
    elevation: "level1",
  },
};

interface PaperProviderProps {
  children: React.ReactNode;
}

export const PaperProvider: React.FC<PaperProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme == "dark";
  return (
    <RNPaperpProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      {children}
    </RNPaperpProvider>
  );
};
