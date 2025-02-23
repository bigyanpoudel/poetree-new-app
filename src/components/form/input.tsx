import { Colors } from "@/src/utils/constant/colors";
import { useField } from "formik";
import React from "react";
import { useColorScheme, View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { Text } from "../text";
interface InputFieldProps extends TextInputProps {
  name: string;
  height?: any;
}
export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  height = 48,
  ...props
}) => {
  const colorSchema = useColorScheme();
  const [field, meta, helpers] = useField(name);
  const isDark = colorSchema === "dark";
  console.log("field", field, meta, helpers);
  return (
    <View className="flex flex-col gap-3">
      {label && <Text className="text-lg pl-2">{label}</Text>}
      <TextInput
        mode="outlined"
        contentStyle={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 12,
          paddingBottom: 13,
          color: isDark ? Colors.dark.text : Colors.light.text,
        }}
        style={{
          height: height,
        }}
        outlineStyle={{
          borderRadius: 48,
        }}
        placeholderTextColor={isDark ? "#bdbdbd" : "#757575"}
        value={field.value} // Bind value to Formik
        onChangeText={helpers.setValue} // Bind onChangeText to Formik
        onBlur={() => helpers.setTouched(true)} // Mark as touched on blur
        {...props}
      />
      {meta.touched && meta.error && (
        <Text className="text-red-500 text-sm pl-2">{meta.error}</Text>
      )}
    </View>
  );
};
