import React from "react";
import { useColorScheme, View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { Text } from "../text";
import { useField } from "formik";
interface InputFieldProps extends TextInputProps {
  name: string;
}
export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  ...props
}) => {
  const colorSchema = useColorScheme();
  const [field, meta, helpers] = useField(name);
  const isDark = colorSchema === "dark";
  console.log("field", field, meta, helpers);
  return (
    <View className="flex flex-col gap-3">
      <Text className="text-lg pl-2">{label}</Text>
      <TextInput
        mode="outlined"
        contentStyle={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 12,
          paddingBottom: 12,
          height: 48,
        }}
        outlineStyle={{
          borderRadius: 48,
        }}
        placeholder="Hello"
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
