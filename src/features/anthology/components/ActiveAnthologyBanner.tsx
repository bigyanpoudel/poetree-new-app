import { FastImageComponent } from "@/src/components/image";
import { Text } from "@/src/components/text";
import { AnthologyStatusEnum, IAppAnthology } from "@/src/types";
import { Colors } from "@/src/utils/constant/colors";
import { useRouter } from "expo-router";
import { Calendar, ChevronRight, Image as ImageIcon } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import { useGetPublicAnthologies } from "../hooks";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import dayjs from "dayjs";

export const ActiveAnthologyBanner = () => {
  const { data, isLoading } = useGetPublicAnthologies({ limit: 1 });
  const router = useRouter();
  const isDark = useIsDarkTheme();

  const anthology: IAppAnthology | undefined = data?.pages?.[0]?.data?.[0];

  if (isLoading || !anthology) {
    return null;
  }

  // Check if deadline has passed
  const isDeadlinePassed = anthology?.submissionDeadline
    ? dayjs().isAfter(dayjs(anthology.submissionDeadline))
    : false;

  // Determine actual status based on deadline
  const actualStatus = anthology?.status !== AnthologyStatusEnum.Completed && isDeadlinePassed
    ? AnthologyStatusEnum.Completed
    : anthology?.status;

  const isActive = actualStatus === AnthologyStatusEnum.Ongoing && !isDeadlinePassed;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Pressable
      onPress={() => router.push(`/anthology/${anthology._id}`)}
      className="mx-4 mb-4"
    >
      <View
        className="rounded-lg overflow-hidden flex-row"
        style={{
          backgroundColor: isDark ? Colors.dark.background : "#fff",
          borderWidth: 1,
          borderColor: isDark ? "#333" : "#e0e0e0",
          height: 120,
        }}
      >
        {/* Image Section */}
        <View className="relative w-32">
          {anthology.coverImage ? (
            <>
              <FastImageComponent
                source={{ uri: anthology.coverImage }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
              <View
                className="absolute top-0 left-0 right-0 bottom-0"
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                }}
              />
            </>
          ) : (
            <View
              className="w-full h-full items-center justify-center"
              style={{ backgroundColor: isDark ? "#2a2a2a" : "#f0f0f0" }}
            >
              <ImageIcon
                size={32}
                color={isDark ? "#666" : "#999"}
                opacity={0.5}
              />
            </View>
          )}
          {isActive && (
            <View className="absolute top-2 left-2">
              <View
                className="px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#10b981" }}
              >
                <Text
                  className="text-[10px] uppercase"
                  style={{ color: "#fff" }}
                  fontWeight={700}
                >
                  Active
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Content Section */}
        <View className="flex-1 p-3 justify-between">
          <View>
            <Text className="text-sm mb-1" fontWeight={700} numberOfLines={2}>
              {anthology.title}
            </Text>

            <Text className="text-xs opacity-60 mb-2" numberOfLines={1}>
              {anthology.theme}
            </Text>
          </View>

          {/* Info Row */}
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center gap-1.5">
              <Calendar
                size={12}
                color={isDark ? "#fff" : "#000"}
                opacity={0.5}
              />
              <Text className="text-[11px] opacity-50">
                {formatDate(anthology.submissionDeadline)}
              </Text>
            </View>

            {/* Read More Icon Button */}
            <View
              className="items-center justify-center rounded-full"
              style={{
                backgroundColor: isDark ? "#333" : "#e0e0e0",
                width: 24,
                height: 24,
              }}
            >
              <ChevronRight
                size={16}
                color={isDark ? "#fff" : "#000"}
                opacity={0.7}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
