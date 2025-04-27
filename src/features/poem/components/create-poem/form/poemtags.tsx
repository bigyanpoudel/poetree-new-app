import { Button, Text } from "@/src/components";
import { HashtagButton } from "@/src/components/poem/helper/poemHashTag";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { AntDesign } from "@expo/vector-icons";
import { useField } from "formik";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
interface TagInputFieldProps {
  name: string;
  label: string;
  placeholder: string;
}

export const TagInputField: React.FC<TagInputFieldProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [field, meta, helpers] = useField(name);
  const isDark = useIsDarkTheme();
  const sanitizeTag = (input: string) => {
    // Remove any leading '#' or special characters
    return input.replace(/^#/, "").trim();
  };

  const handleAddTag = () => {
    const value = field.value;
    if (value) {
      const sanitizedValue = sanitizeTag(value);
      if (sanitizedValue && !tags.includes(sanitizedValue)) {
        // Avoid duplicate and empty tags
        const updatedTags = new Set([...tags, sanitizedValue]);
        setTags([...updatedTags]);
        helpers.setValue(""); // Clear the input field
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return (
    <View className="flex flex-col gap-4">
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View className="flex flex-col flex-1 gap-2">
          {label && <Text className="text-lg pl-2">{label}</Text>}
          <TextInput
            mode="outlined"
            placeholder={placeholder}
            value={field.value}
            onChangeText={helpers.setValue}
            contentStyle={{
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 13,
              color: isDark ? Colors.dark.text : Colors.light.text,
            }}
            outlineStyle={{
              borderRadius: 48,
            }}
            placeholderTextColor={isDark ? "#bdbdbd" : "#757575"}
            onSubmitEditing={handleAddTag} // Trigger adding a tag when pressing Enter
          />
          {meta.touched && meta.error && (
            <Text style={{ color: "red", fontSize: 12, marginLeft: 8 }}>
              {meta.error}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={handleAddTag}>
          <Button
            contentStyle={{
              height: 48,
              borderRadius: 12,
            }}
            mode="contained"
            style={{
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
            }}
            className="rounded-xl"
          >
            <AntDesign name="plus" size={24} />
          </Button>
        </TouchableOpacity>
      </View>
      {tags.length > 0 && (
        <View className="flex flex-row gap-3">
          {tags.map((tag, index) => (
            <HashtagButton
              icon={
                <AntDesign
                  name="close"
                  size={18}
                  className="dark:text-darkTextColor text-ligtTextColor "
                />
              }
              onPress={() => handleRemoveTag(tag)}
              key={tag}
              title={tag}
              className="flex flex-row gap-3 items-center px-3"
            />
          ))}
        </View>
      )}
    </View>
  );
};
