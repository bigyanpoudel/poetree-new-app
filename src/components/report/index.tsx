import { Button } from "@/src/components";
import { Text } from "@/src/components/text";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View, useColorScheme } from "react-native";

export const ReportComponent = ({
  onConfirm,
  isUser = false,
}: {
  onConfirm: (args: string) => void;
  isUser?: boolean;
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const REPORTTYPE = [
    "Nudity or Sexual Activity",
    "Violence", 
    "Harassment",
    "Hate Speech",
    "Spam",
    "Other",
  ];

  const REPORTUSER = [
    "Fake Account",
    "Impersonation", 
    "Harassment or Bullying",
    "Inappropriate Content",
    "Hate Speech",
    "Scams or Fraud",
    "Spam",
    "Other",
  ];

  const data = isUser ? REPORTUSER : REPORTTYPE;

  return (
    <View className="flex flex-col gap-4">
      <View>
        <Text className="text-base font-semibold dark:text-white mb-2">
          Report this {isUser ? "user" : "poem"}
        </Text>
        <Text className="dark:text-white/60 text-gray-600 text-sm">
          Help us understand what's happening with this {isUser ? "user" : "poem"}. How would you describe it?
        </Text>
      </View>
      
      <View className="flex flex-col gap-2">
        {data.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              onConfirm(item);
            }}
            className="flex flex-row justify-between items-center h-[48px] px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
            }}
          >
            <Text className="text-sm dark:text-white/80 text-gray-700 flex-1">
              {item}
            </Text>
            <ChevronRight 
              size={16} 
              color={isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};