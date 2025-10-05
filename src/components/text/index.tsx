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
    500: "Poximanova",
    400: "Poximanova400",
    600: "Poximanova600",
    700: "Poximanova700",
    800: "Poximanova800",
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
