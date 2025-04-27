import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import {
  CodeBridge,
  darkEditorTheme,
  DEFAULT_TOOLBAR_ITEMS,
  Images,
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";

import { useField } from "formik";
import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Text } from "@/src/components";

interface TentapEditorFieldProps {
  name: string;
  label?: string;
  height?: number;
}
const customTextCSS = (isDark: boolean) => `
  body {
    color: ${isDark ? Colors.dark.primary : Colors.light.primary};
    font-family: System;
    font-size: 16px;
 
  }

  p {
    color: ${isDark ? "white" : "black"};
  }
`;
export const TentapEditorField: React.FC<TentapEditorFieldProps> = ({
  name,
  label,
  height = 300,
}) => {
  const [field, meta, helpers] = useField(name);
  const isDark = useIsDarkTheme();
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,

    editable: true,
    initialContent: "",
    bridgeExtensions: [
      ...TenTapStartKit,
      CodeBridge.configureCSS(customTextCSS(isDark)),
    ],
    theme: isDark ? darkEditorTheme : undefined,
  });
  const content = useEditorContent(editor);

  React.useEffect(() => {
    if (content) {
      helpers.setValue(content, false);
    }
  }, [content]);

  return (
    <View className="flex flex-col gap-2">
      {label && <Text className="text-lg pl-2">{label}</Text>}
      <RichText
        editor={editor}
        style={{
          minHeight: height,
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.dark.primary,
          margin: 0,
          paddingTop: 0,
        }}
        containerStyle={{
          borderRadius: 12,
          borderWidth: 0.8,
          padding: 12,
          borderColor: isDark ? Colors.dark.borderColor : Colors.light.primary,
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.dark.primary,
          margin: 0,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <Toolbar
          items={DEFAULT_TOOLBAR_ITEMS.filter((item: any) => {
            const image = item.image();
            return (
              image === Images.bold ||
              image === Images.italic ||
              image === Images.Aa
            );
          })}
          editor={editor}
        />
      </KeyboardAvoidingView>
      {meta.touched && meta.error && (
        <Text className="dark:text-red-500 text-red-500 text-sm pl-2">
          {meta.error}
        </Text>
      )}
    </View>
  );
};
