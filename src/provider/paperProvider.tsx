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
  fonts: {
    ...DefaultTheme.fonts, // Preserve existing font configurations
    default: {
      ...DefaultTheme.fonts.default, // Preserve existing default font properties
      fontFamily: "Poximanova", // Add custom font family
    },
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge, // Preserve existing labelLarge properties
      fontFamily: "Poximanova", // Add custom font family
    },
    // Add custom font family to other text variants if needed
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: "Poximanova",
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontFamily: "Poximanova",
    },
    displaySmall: {
      ...DefaultTheme.fonts.displaySmall,
      fontFamily: "Poximanova",
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: "Poximanova",
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: "Poximanova",
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: "Poximanova",
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: "Poximanova",
    },
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontFamily: "Poximanova",
    },
    titleSmall: {
      ...DefaultTheme.fonts.titleSmall,
      fontFamily: "Poximanova",
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: "Poximanova",
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: "Poximanova",
    },
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: "Poximanova",
    },
    labelMedium: {
      ...DefaultTheme.fonts.labelMedium,
      fontFamily: "Poximanova",
    },
    labelSmall: {
      ...DefaultTheme.fonts.labelSmall,
      fontFamily: "Poximanova",
    },
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
  fonts: {
    ...DefaultTheme.fonts, // Preserve existing font configurations
    default: {
      ...DefaultTheme.fonts.default, // Preserve existing default font properties
      fontFamily: "Poximanova", // Add custom font family
    },
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge, // Preserve existing labelLarge properties
      fontFamily: "Poximanova", // Add custom font family
    },
    // Add custom font family to other text variants if needed
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: "Poximanova",
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontFamily: "Poximanova",
    },
    displaySmall: {
      ...DefaultTheme.fonts.displaySmall,
      fontFamily: "Poximanova",
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: "Poximanova",
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: "Poximanova",
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: "Poximanova",
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: "Poximanova",
    },
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontFamily: "Poximanova",
    },
    titleSmall: {
      ...DefaultTheme.fonts.titleSmall,
      fontFamily: "Poximanova",
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: "Poximanova",
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: "Poximanova",
    },
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: "Poximanova",
    },
    labelMedium: {
      ...DefaultTheme.fonts.labelMedium,
      fontFamily: "Poximanova",
    },
    labelSmall: {
      ...DefaultTheme.fonts.labelSmall,
      fontFamily: "Poximanova",
    },
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
