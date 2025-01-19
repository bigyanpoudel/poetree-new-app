import { Obj } from "@/src/types";
interface CustomColors {
  text: string;
  background: string;
  primary: string;
  icon: string;
  tabIconDefault: string;
  borderColor: string;
}
interface IColorsType {
  light: CustomColors;
  dark: CustomColors;
}
export const Colors: IColorsType = {
  light: {
    text: "#11181C",
    background: "#fffff",
    primary: "#1E1E1E",
    icon: "#687076",
    tabIconDefault: "#687076",
    borderColor: "#e9ecf0",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    primary: "#ffff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    borderColor: "#e9ecf0",
  },
};
