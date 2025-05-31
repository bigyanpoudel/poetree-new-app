import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { IconButton } from "react-native-paper";
import { Text } from "../text";
interface CustomDrawerProps {
  title?: string;
  content: React.ReactNode;
  index: number;
  handleClose: () => void;
}

export const CustomDrawer = forwardRef(
  ({ content, title, index, handleClose }: CustomDrawerProps, ref: any) => {
    const isDark = useIsDarkTheme();
    const handleSheetChanges = (i: number) => {
      // Trigger onClose when the bottom sheet is closed
      if (i < 0) {
        handleClose();
      }
    };

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );
    console.log("index", index);
    return (
      <BottomSheet
        backgroundStyle={{
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.dark.background,
        }}
        index={index}
        ref={ref}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        style={{
          zIndex: 9999,
        }}
        containerStyle={{
          zIndex: 9999,
        }}
      >
        <BottomSheetView>
          {title && (
            <TouchableWithoutFeedback
              onPress={() => {
                handleClose();
              }}
            >
              <View className="flex flex-row gap-0 items-center">
                <IconButton
                  icon={() => (
                    <MaterialIcons
                      name="arrow-back-ios-new"
                      size={20}
                      className="text-ligtTextColor dark:text-darkTextColor"
                    />
                  )}
                  onPress={handleClose}
                />
                <Text className="text-lg" fontWeight={800}>
                  {title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          <View className="px-5 py-3 max-h-[75vh]">{content}</View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
