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
}
export const CustomDailog: React.FC<ICustomDailogProps> = ({
  content,
  visible,
  onClose,
}) => {
  const isDark = useIsDarkTheme();
  return (
    <Portal>
      <Dialog
        style={{
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
        }}
        visible={visible}
        onDismiss={onClose}
      >
        <Dialog.Title className="text-lg dark:text-darkTextColor text-ligtTextColor mb-1">
          Alert
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
            className="min-w-[150px] bg-ui-error text-white"
            onPress={onClose}
          >
            Confim
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
