import React from "react";
import { Button as RNButton, ButtonProps } from "react-native-paper";
import classnames from "classnames";
interface IButtonProps extends ButtonProps {}
export const Button: React.FC<IButtonProps> = ({ className, ...props }) => {
  return (
    <RNButton className={classnames("rounded-full ", className)} {...props} />
  );
};
