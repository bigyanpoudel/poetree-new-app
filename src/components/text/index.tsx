import { Text as RNText, type TextProps } from "react-native";
import classnames from "classnames";
export type ITextProps = TextProps & {};

export const Text: React.FC<ITextProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <RNText
      className={classnames(
        "dark:text-darkTextColor  text-ligtTextColor",
        className
      )}
      style={{
        fontFamily: "Poximanova",
      }}
      {...props}
    >
      {children}
    </RNText>
  );
};
