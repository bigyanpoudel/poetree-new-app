import React, { useState } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { Colors } from "@/src/utils/constant/colors";
import { storageUtil } from "@/src/utils/storage";
import { useAppProvider } from "@/src/provider/appProvider";
import { Button } from "@/src/components";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Welcome to Poetree",
    description:
      "Discover, share, and explore beautiful poetry from creators around the world",
    image: require("../assets/images/poetree_logo.png"),
  },
  {
    id: 2,
    title: "Create & Share",
    description:
      "Express yourself through poetry and share your thoughts with a community of poetry lovers",
    image: require("../assets/images/poetree_logo.png"),
  },
  {
    id: 3,
    title: "Build Your Collection",
    description:
      "Create playlists, follow your favorite poets, and curate your personal poetry library",
    image: require("../assets/images/poetree_logo.png"),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDark = useIsDarkTheme();
  const { setHasSeenOnboarding } = useAppProvider();

  const backgroundColor = isDark
    ? Colors.dark.scafoldColor
    : Colors.light.scafoldColor;
  const textColor = isDark ? Colors.dark.text : Colors.light.text;
  const primaryColor = isDark ? Colors.dark.primary : Colors.light.primary;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    await storageUtil.setItem("hasSeenOnboarding", JSON.stringify(true));
    setHasSeenOnboarding(true);
    router.replace("/(home)");
  };

  const currentData = onboardingData[currentIndex];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        {/* Skip Button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: 16,
          }}
        >
          <TouchableOpacity
            onPress={handleSkip}
            style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          >
            <Text
              style={{
                color: textColor,
                fontFamily: "Poximanova",
                fontSize: 16,
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* Image */}
          <View style={{ marginBottom: 60 }}>
            <Image
              source={
                isDark
                  ? require("../assets/images/poetree_logo_white.png")
                  : currentData.image
              }
              style={{
                width: width * 0.6,
                height: width * 0.6,
                resizeMode: "contain",
              }}
            />
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
              color: textColor,
              fontFamily: "Garamond",
              marginBottom: 16,
            }}
          >
            {currentData.title}
          </Text>

          {/* Description */}
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: textColor,
              fontFamily: "Poximanova",
              lineHeight: 24,
              paddingHorizontal: 32,
              opacity: 0.8,
            }}
          >
            {currentData.description}
          </Text>
        </View>

        {/* Bottom Section */}
        <View style={{ paddingBottom: 40 }}>
          {/* Pagination Dots */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={{
                  width: index === currentIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    index === currentIndex
                      ? primaryColor
                      : isDark
                      ? "#374151"
                      : "#e5e7eb",
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>

          {/* Next Button */}
          <Button
            mode="contained"
            className="rounded-md"
            labelStyle={{
              fontSize: 18,
            }}
            onPress={handleNext}
          >
            {currentIndex === onboardingData.length - 1
              ? "Get Started"
              : "Next"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
