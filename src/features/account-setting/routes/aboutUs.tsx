import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import { Globe } from "lucide-react-native";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Linking, TouchableOpacity, useColorScheme, View } from "react-native";

// Social Media Links
const SOCIAL_LINKS = {
  website: "https://www.poetree.ca",
  facebook: "https://facebook.com/poetreeapp",
  instagram: "https://instagram.com/poetreeapp",
  youtube: "https://youtube.com/@poetreeapp",
};

export const AboutUsScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScreenLayout
      appBar={{
        title: "About Us",
      }}
    >
      <View className="flex flex-col gap-6">
        <View>
          <Text className="text-2xl font-bold mb-4 dark:text-white">
            Welcome to Poetree
          </Text>
          <Text className="text-xl font-medium mb-4 dark:text-white">
            Social Media For Poets
          </Text>
        </View>

        <View className="flex flex-col gap-4">
          <Text className="text-base leading-7 dark:text-gray-300">
            Poetree is one of the fastest growing free to use platforms for
            poets and poetry lovers to share their work and connect with others.
            It is a community of writers and readers who come together to
            celebrate the beauty of language and the power of words. Whether you
            are a seasoned poet or just starting out writing poems, Poetree is
            the perfect place to share your work, receive feedback from other
            poets and readers of poetry, and find inspiration.
          </Text>

          <Text className="text-base leading-7 dark:text-gray-300">
            At Poetree, we have designed a minimalistic user interface where
            poets can post text, videos, and images to enable them to express
            their poetry to their readers.
          </Text>

          <Text className="text-base leading-7 dark:text-gray-300">
            Poetree is where poets can participate in Poetry contests and win
            cash prizes. At Poetree, we believe in empowering writers and
            creative people all over the world and aim to create a platform
            where they can earn with their talent or craft.
          </Text>

          <Text className="text-base leading-7 font-medium dark:text-white">
            Join us today and become part of our vibrant community!
          </Text>
        </View>

        <View className="mt-6 bg-white dark:bg-darker-200 rounded-lg p-4">
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Our Mission
          </Text>
          <Text className="text-base leading-6 dark:text-gray-300">
            To provide a platform where poets and poetry enthusiasts can
            connect, share, and celebrate the art of poetry while empowering
            creators to earn from their craft.
          </Text>
        </View>

        <View className="bg-white dark:bg-darker-200 rounded-lg p-4">
          <Text className="text-lg font-semibold mb-2 dark:text-white">
            Our Vision
          </Text>
          <Text className="text-base leading-6 dark:text-gray-300">
            To become the world's leading social media platform for poets,
            fostering creativity, community, and commerce in the poetry space.
          </Text>
        </View>

        {/* Social Media Links */}
        <View className="mt-6 bg-gray-50 dark:bg-darker-200 rounded-lg p-4 flex flex-col gap-4">
          <View>
            <Text className="text-lg font-semibold mb-4 dark:text-white">
              Connect With Us
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Follow us on social media for updates, poetry inspiration, and
              community highlights.
            </Text>
          </View>
          <View className="flex flex-col gap-3">
            {/* Website */}
            <TouchableOpacity
              onPress={() => handleLinkPress(SOCIAL_LINKS.website)}
              className="flex flex-row items-center gap-3 bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-3"
            >
              <View className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Globe size={16} color={isDark ? "#60A5FA" : "#2563EB"} />
              </View>
              <Text className="text-sm font-medium dark:text-white flex-1">
                Website
              </Text>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity
              onPress={() => handleLinkPress(SOCIAL_LINKS.facebook)}
              className="flex flex-row items-center gap-3 bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-3"
            >
              <View className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Ionicons name="logo-facebook" size={16} color={isDark ? "#60A5FA" : "#1877F2"} />
              </View>
              <Text className="text-sm font-medium dark:text-white flex-1">
                Facebook
              </Text>
            </TouchableOpacity>

            {/* Instagram */}
            <TouchableOpacity
              onPress={() => handleLinkPress(SOCIAL_LINKS.instagram)}
              className="flex flex-row items-center gap-3 bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-3"
            >
              <View className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                <Ionicons name="logo-instagram" size={16} color={isDark ? "#F472B6" : "#E4405F"} />
              </View>
              <Text className="text-sm font-medium dark:text-white flex-1">
                Instagram
              </Text>
            </TouchableOpacity>

            {/* YouTube */}
            <TouchableOpacity
              onPress={() => handleLinkPress(SOCIAL_LINKS.youtube)}
              className="flex flex-row items-center gap-3 bg-white dark:bg-darker-100 border border-ui-border dark:border-ui-border/20 rounded-lg p-3"
            >
              <View className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <Ionicons name="logo-youtube" size={16} color={isDark ? "#F87171" : "#FF0000"} />
              </View>
              <Text className="text-sm font-medium dark:text-white flex-1">
                YouTube
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};