import { useColorScheme } from "react-native";

export const useIsDarkTheme = () => {
  const theme = useColorScheme();
  return theme == "dark";
};
