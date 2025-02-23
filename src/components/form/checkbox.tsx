import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import { Text } from "../text"; // Assume this is your custom Text component
import { useField } from "formik";

interface CheckboxFieldProps {
  name: string; // Formik field name
  label: string; // Label for the checkbox
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => helpers.setValue(!field.value)}
    >
      <View className="flex flex-row items-center gap-2">
        <Checkbox
          status={field.value ? "checked" : "unchecked"}
          onPress={() => helpers.setValue(!field.value)}
        />
        <Text className="text-lg">{label}</Text>
      </View>
      {meta.touched && meta.error && (
        <Text className="text-red-500 text-sm">{meta.error}</Text>
      )}
    </TouchableOpacity>
  );
};
