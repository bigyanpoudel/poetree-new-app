import * as React from "react";
import { useColorScheme } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider as RNPaperpProvider,
} from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

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
      fontFamily: "Karla", // Add custom font family
    },
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge, // Preserve existing labelLarge properties
      fontFamily: "Karla", // Add custom font family
    },
    // Add custom font family to other text variants if needed
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: "Karla",
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontFamily: "Karla",
    },
    displaySmall: {
      ...DefaultTheme.fonts.displaySmall,
      fontFamily: "Karla",
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: "Karla",
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: "Karla",
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: "Karla",
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: "Karla",
    },
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontFamily: "Karla",
    },
    titleSmall: {
      ...DefaultTheme.fonts.titleSmall,
      fontFamily: "Karla",
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: "Karla",
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: "Karla",
    },
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: "Karla",
    },
    labelMedium: {
      ...DefaultTheme.fonts.labelMedium,
      fontFamily: "Karla",
    },
    labelSmall: {
      ...DefaultTheme.fonts.labelSmall,
      fontFamily: "Karla",
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
      fontFamily: "Karla", // Add custom font family
    },
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge, // Preserve existing labelLarge properties
      fontFamily: "Karla", // Add custom font family
    },
    // Add custom font family to other text variants if needed
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: "Karla",
    },
    displayMedium: {
      ...DefaultTheme.fonts.displayMedium,
      fontFamily: "Karla",
    },
    displaySmall: {
      ...DefaultTheme.fonts.displaySmall,
      fontFamily: "Karla",
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: "Karla",
    },
    headlineMedium: {
      ...DefaultTheme.fonts.headlineMedium,
      fontFamily: "Karla",
    },
    headlineSmall: {
      ...DefaultTheme.fonts.headlineSmall,
      fontFamily: "Karla",
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: "Karla",
    },
    titleMedium: {
      ...DefaultTheme.fonts.titleMedium,
      fontFamily: "Karla",
    },
    titleSmall: {
      ...DefaultTheme.fonts.titleSmall,
      fontFamily: "Karla",
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: "Karla",
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: "Karla",
    },
    bodySmall: {
      ...DefaultTheme.fonts.bodySmall,
      fontFamily: "Karla",
    },
    labelMedium: {
      ...DefaultTheme.fonts.labelMedium,
      fontFamily: "Karla",
    },
    labelSmall: {
      ...DefaultTheme.fonts.labelSmall,
      fontFamily: "Karla",
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
