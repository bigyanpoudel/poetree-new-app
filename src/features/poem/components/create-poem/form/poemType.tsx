import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { useField } from "formik";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/src/components";

interface IPoemTypeProps {
  name: string;
  label?: string;
}

export const PoemType: React.FC<IPoemTypeProps> = ({ name, label }) => {
  const [field, , helpers] = useField(name);
  const [, , fileHelper] = useField("file");
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
    console.log("Tab pressed:", tab);
    helpers.setValue(tab);
    fileHelper.setValue(undefined);
  };

  return (
    <View className="flex flex-col py-2 gap-2">
      {label && <Text className="text-lg pl-2">{label}</Text>}


      <View
        style={{
          flexDirection: "row",
          backgroundColor: isDark ? Colors.light.primary : Colors.dark.primary,
          zIndex: 9999,
          elevation: 10,
        }}
      >
        {POST_TYPES.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            activeOpacity={0.7}
            onPress={() => handleTabChange(tab.value)}
            onPressIn={() => console.log("PRESS IN:", tab.value)}
            onPressOut={() => console.log("PRESS OUT:", tab.value)}
            onLongPress={() => console.log("LONG PRESS:", tab.value)}
            delayPressIn={0}
            hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
            style={{
              flex: 1,
              padding: 12,
              borderBottomWidth: field.value === tab.value ? 2 : 0,
              borderColor: isDark ? Colors.dark.primary : Colors.light.primary,
              alignItems: "center",
              zIndex: 9999,
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
                fontFamily: "Karla",
                fontSize: 14,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
