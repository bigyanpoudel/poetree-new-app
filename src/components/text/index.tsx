import { Text as RNText, type TextProps } from "react-native";
import classnames from "classnames";
export type ITextProps = TextProps & {
  fontWeight?: number;
};

export const Text: React.FC<ITextProps> = ({
  children,
  className,
  fontWeight = 400,
  style,
  ...props
}) => {
  const fontMapping: any = {
    500: "Karla",
    400: "Karla",
    600: "Karla",
    700: "Karla",
    800: "Karla",
  };
  return (
    <RNText
      className={classnames(
        "dark:text-darkTextColor  text-ligtTextColor",
        className
      )}
      style={[
        {
          fontFamily: fontMapping[fontWeight],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
