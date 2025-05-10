import React from "react";
import { Dialog, Portal } from "react-native-paper";
import { Button } from "../button";
import { Text } from "../text";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
interface ICustomDailogProps {
  visible: boolean;
  onClose: () => void;
  content: String;
  title?: string;
  onConfirm: () => void;
  isLoading?: boolean;
}
export const CustomDailog: React.FC<ICustomDailogProps> = ({
  content,
  visible,
  onClose,
  title,
  onConfirm,
  isLoading,
}) => {
  const isDark = true;
  // const isDark = useIsDarkTheme();
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
        <Dialog.Title className="text-lg dark:text-darkTextColor text-ligtTextColor mb-1">
          {title ?? "Are your sure?"}
        </Dialog.Title>
        <Dialog.Content>
          <Text className="text-base">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="contained" className="min-w-[100px]" onPress={onClose}>
            Cancel
          </Button>
          <Button
            mode="contained"
            labelStyle={{
              color: "white",
            }}
            loading={isLoading}
            className="min-w-[150px] bg-ui-error text-white"
            onPress={onConfirm}
          >
            Confim
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
