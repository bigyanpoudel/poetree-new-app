import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import { useColorScheme } from "react-native";
import { Mail } from "lucide-react-native";
import React from "react";
import { Linking, TouchableOpacity, View } from "react-native";

export const SupportScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleEmailSupport = () => {
    Linking.openURL("mailto:info@poetree.ca?subject=Support Request");
  };

  return (
    <ScreenLayout
      appBar={{
        title: "Support",
      }}
    >
      <View className="flex flex-col gap-6 ">
        <View>
          <Text className="text-xl font-bold mb-4 dark:text-white">
            How can we help you?
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-400 ">
            Get in touch with our support team for assistance.
          </Text>
        </View>

        {/* Email Support */}
        <TouchableOpacity onPress={handleEmailSupport}>
          <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4 flex flex-row items-center gap-4">
            <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Mail size={24} color={isDark ? "#60A5FA" : "#2563EB"} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold dark:text-white">
                Email Support
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                info@poetree.ca
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-500">
                We usually respond within 24 hours
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* FAQ Section */}
        <View className="mt-6 flex flex-col gap-4">
          <Text className="text-lg font-semibold  dark:text-white">
            Frequently Asked Questions
          </Text>
          
          <View className="flex flex-col gap-4">
            <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4">
              <Text className="text-base font-semibold mb-2 dark:text-white">
                How do I create and publish a poem?
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Go to Account Settings → Create Poem. You can write text poems, upload images, or record audio/video poems. Add hashtags to help others discover your work.
              </Text>
            </View>

            <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4">
              <Text className="text-base font-semibold mb-2 dark:text-white">
                How do I create a playlist?
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Go to Account Settings → Create Playlist. Select poems to include, set a price if you want to monetize it, and publish your curated collection.
              </Text>
            </View>

            <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4">
              <Text className="text-base font-semibold mb-2 dark:text-white">
                How do I purchase a playlist?
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Browse playlists in the Shop or Explore sections. Tap on a playlist to view details, then tap the purchase button to buy it with your payment method.
              </Text>
            </View>

            <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4">
              <Text className="text-base font-semibold mb-2 dark:text-white">
                How do I follow other poets?
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Find poets in the Explore section or search for them. Tap on their profile and hit the "Follow" button to see their latest poems in your feed.
              </Text>
            </View>

            <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4">
              <Text className="text-base font-semibold mb-2 dark:text-white">
                How do I change my password?
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Go to Account Settings → Change Password. Enter your current password and set a new one to secure your account.
              </Text>
            </View>

            <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4">
              <Text className="text-base font-semibold mb-2 dark:text-white">
                How do I add a payment method?
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Go to Account Settings → Payment Account to add your bank account or payment details for receiving earnings from your playlists.
              </Text>
            </View>

            <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4">
              <Text className="text-base font-semibold mb-2 dark:text-white">
                How do I use hashtags effectively?
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Use relevant hashtags when posting poems to help others discover your work. You can tap on any hashtag to search for related content and explore trending topics.
              </Text>
            </View>

            <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4">
              <Text className="text-base font-semibold mb-2 dark:text-white">
                How do I view my purchase history?
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Go to Account Settings → My Purchase to see all your playlist purchases, payment status, and download invoices.
              </Text>
            </View>

            <View className="bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-4">
              <Text className="text-base font-semibold mb-2 dark:text-white">
                Can I edit my profile information?
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Yes! Go to Account Settings → Edit Profile to update your name, profile picture, bio, and other personal information.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};