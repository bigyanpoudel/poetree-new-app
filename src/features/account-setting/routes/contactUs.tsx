import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import React from "react";
import { Linking, View } from "react-native";

export const ContactUsScreen = () => {
  const handleEmailContact = () => {
    Linking.openURL("mailto:info@poetree.ca");
  };

  return (
    <ScreenLayout
      appBar={{
        title: "Contact Us",
      }}
    >
      <View className="flex flex-col gap-6">
        <Text className="text-2xl font-semibold dark:text-white">
          CONTACT US
        </Text>
        <Text className="text-lg dark:text-gray-300">
          Contact us for corporate related matters, if you have technical
          issues, please contact our support team directly at{" "}
          <Text
            className="font-bold dark:text-white text-blue-600"
            onPress={handleEmailContact}
          >
            info@poetree.ca
          </Text>
        </Text>
      </View>
    </ScreenLayout>
  );
};
