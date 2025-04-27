import { useField } from "formik";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-paper";
import { Text } from "../text"; // Assume this is your custom Text component

interface SwitchFieldProps {
  name: string; // Formik field name
  label: string; // Label for the checkbox
  leftText: string;
  rightText: string;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  name,
  label,
  leftText,
  rightText,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View className="flex flex-row gap-2 justify-between items-center w-full flex-1">
      {label && <Text className="text-lg pl-2">{label}</Text>}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => helpers.setValue(!field.value)}
      >
        <View className="flex flex-row items-center gap-2">
          <Text className="text-base">{leftText}</Text>
          <Switch
            value={field.value}
            onValueChange={(newValue) => {
              helpers.setValue(newValue);
            }}
          />
          <Text className="text-base">{rightText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
