import { useField } from "formik";
import React from "react";
import { useColorScheme, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "../text"; // Your custom Text component
import { Colors } from "@/src/utils/constant/colors";
import { AntDesign } from '@expo/vector-icons';

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
    <View className="flex flex-col gap-2">
      <Text className="text-lg pl-2">{label}</Text>
      <Dropdown
        style={{
          height: 48,
          borderColor: meta.touched && meta.error 
            ? (isDark ? '#ef4444' : '#dc2626') 
            : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'),
          borderWidth: 1,
          borderRadius: 48,
          paddingHorizontal: 24,
          backgroundColor: isDark ? '#151718' : 'white',
        }}
        placeholderStyle={{
          fontSize: 16,
          color: isDark ? '#bdbdbd' : '#757575',
          fontFamily: 'Karla',
        }}
        selectedTextStyle={{
          fontSize: 16,
          color: isDark ? Colors.dark.text : Colors.light.text,
          fontFamily: 'Karla',
        }}
        inputSearchStyle={{
          height: 40,
          fontSize: 16,
          borderRadius: 8,
          borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          color: isDark ? Colors.dark.text : Colors.light.text,
          backgroundColor: isDark ? '#1f2937' : '#f9fafb',
        }}
        containerStyle={{
          backgroundColor: isDark ? '#151718' : 'white',
          borderRadius: 8,
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        itemTextStyle={{
          fontSize: 16,
          color: isDark ? Colors.dark.text : Colors.light.text,
          fontFamily: 'Karla',
        }}
        itemContainerStyle={{
          backgroundColor: isDark ? '#151718' : 'white',
          borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        }}
        data={options}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={field.value}
        onChange={(item) => {
          helpers.setValue(item.value);
        }}
        renderRightIcon={() => (
          <AntDesign
            style={{ marginRight: 5 }}
            color={isDark ? '#bdbdbd' : '#757575'}
            name="down"
            size={20}
          />
        )}
        renderItem={(item) => {
          const isSelected = item.value === field.value;
          return (
            <View
              style={{
                padding: 16,
                backgroundColor: isSelected 
                  ? (isDark ? '#374151' : '#e5e7eb') 
                  : 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: isDark ? Colors.dark.text : Colors.light.text,
                  fontFamily: 'Karla',
                }}
              >
                {item.label}
              </Text>
            </View>
          );
        }}
      />
      {meta.touched && meta.error && (
        <Text className="dark:text-red-500 text-red-500 text-sm pl-2">
          {meta.error}
        </Text>
      )}
    </View>
  );
};
