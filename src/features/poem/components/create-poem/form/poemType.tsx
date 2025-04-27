import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { useField } from "formik"; // Import Formik hooks and components
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/src/components";
interface IPoemTypeProps {
  name: string;
  label?: string;
}
export const PoemType: React.FC<IPoemTypeProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);
  const [fileField, _, fileHelper] = useField("file");
  const isDark = useIsDarkTheme();

  const POST_TYPES = [
    {
      label: "Text",
      value: "text",
    },
    {
      label: "Audio",
      value: "audio",
    },
    {
      label: "Video",
      value: "video",
    },
  ];

  const handleTabChange = (tab: string) => {
    helpers.setValue(tab);
    fileHelper.setValue(undefined);
  };

  console.log("field", field.value);
  return (
    <View className="flex flex-col gap-2">
      {label && <Text className="text-lg pl-2">{label}</Text>}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: isDark ? Colors.light.primary : Colors.dark.primary,
        }}
      >
        {POST_TYPES.map((tab) => (
          <Pressable
            key={tab.value}
            onPress={() => handleTabChange(tab.value)}
            style={{
              flex: 1,
              padding: 12,
              borderBottomWidth: field.value === tab.value ? 2 : 0,
              borderColor: isDark ? Colors.dark.primary : Colors.light.primary,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color:
                  field.value === tab.value
                    ? isDark
                      ? Colors.dark.primary
                      : Colors.light.primary
                    : isDark
                    ? "rgba(255,255,255,0.5)"
                    : "rgb(0,0,0,0.6)",
                fontFamily: "Poximanova",
                fontSize: 14,
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
