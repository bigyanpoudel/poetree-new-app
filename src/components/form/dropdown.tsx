import { useField } from "formik";
import React from "react";
import { useColorScheme, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { Text } from "../text"; // Your custom Text component
import { Colors } from "@/src/utils/constant/colors";

interface DropdownFieldProps {
  name: string; // Formik field name
  label: string; // Label for the dropdown
  placeholder?: string; // Placeholder for the dropdown
  options: { label: string; value: string }[]; // Dropdown options
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  name,
  label,
  placeholder = "Select an option",
  options = [],
}) => {
  const colorSchema = useColorScheme();
  const [field, meta, helpers] = useField(name); // Formik integration
  const isDark = colorSchema === "dark";
  return (
    <View className="flex flex-col gap-3">
      <Text className="text-lg pl-2">{label}</Text>
      <Dropdown
        placeholder={placeholder}
        value={field.value}
        options={options}
        onSelect={(value) => helpers.setValue(value)}
        mode="outlined"
        menuContentStyle={{
          backgroundColor: isDark ? "#151718" : "white",
        }}
        CustomDropdownInput={(props) => (
          <TextInput
            placeholder={placeholder}
            label={label}
            value={props.selectedLabel}
            right={props.rightIcon}
            mode={"outlined"}
            editable={false}
            placeholderTextColor={isDark ? "#bdbdbd" : "#757575"}
            disabled={props.disabled}
            error={props.error}
            {...props}
            contentStyle={{
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,

              color: isDark ? Colors.dark.text : Colors.light.text,
            }}
            outlineStyle={{
              borderRadius: 48,
            }}
            style={{
              height: 48,
            }}
          />
        )}
        hideMenuHeader
      />
      {meta.touched && meta.error && (
        <Text className="text-red-500 text-sm pl-2">{meta.error}</Text>
      )}
    </View>
  );
};
