import { Colors } from "@/src/utils/constant/colors";
import classNames from "classnames";
import React from "react";
import { Dialog, Portal } from "react-native-paper";
import { Button } from "../button";
import { Text } from "../text";
interface ICustomDailogProps {
  visible: boolean;
  onClose: () => void;
  content: String;
  title?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  okText?: string;
  isHideCancel?: boolean;
  okClassName?: string;
  body?: React.ReactNode;
  isHIdeOk?: boolean;
}
export const CustomDailog: React.FC<ICustomDailogProps> = ({
  content,
  visible,
  onClose,
  title,
  onConfirm,
  isLoading,
  okText,
  isHideCancel = false,
  okClassName,
  body,
  isHIdeOk = false,
}) => {
  const isDark = true;
  return (
    <Portal>
      <Dialog
        testID={title}
        style={{
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
        }}
        visible={visible}
        onDismiss={onClose}
      >
        <Dialog.Title className="text-xl capitalize dark:text-darkTextColor text-ligtTextColor mb-1">
          {title ?? "Are your sure?"}
        </Dialog.Title>
        <Dialog.Content>
          {body ? body : <Text className="text-base text-left">{content}</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          {!isHideCancel && (
            <Button
              mode="contained"
              className="min-w-[100px]"
              onPress={onClose}
            >
              Cancel
            </Button>
          )}
          {!isHIdeOk && (
            <Button
              mode="contained"
              labelStyle={{
                color: "white",
              }}
              loading={isLoading}
              className={classNames(
                "min-w-[150px] bg-ui-error text-white",
                okClassName
              )}
              onPress={onConfirm}
            >
              {okText ?? "Confirm"}
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
