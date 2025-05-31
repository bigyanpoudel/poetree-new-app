import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import React from "react";
import { View } from "react-native";

export const AboutUsScreen = () => {
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
              Poetree is one of the fastest growing free to use platforms for poets and poetry lovers to share their work and connect with others. 
              It is a community of writers and readers who come together to celebrate the beauty of language and the power of words. Whether you 
              are a seasoned poet or just starting out writing poems, Poetree is the perfect place to share your work, receive feedback from other 
              poets and readers of poetry, and find inspiration.
            </Text>

            <Text className="text-base leading-7 dark:text-gray-300">
              At Poetree, we have designed a minimalistic user interface where poets can post text, videos, and images to enable them to express 
              their poetry to their readers.
            </Text>

            <Text className="text-base leading-7 dark:text-gray-300">
              Poetree is where poets can participate in Poetry contests and win cash prizes. At Poetree, we believe in empowering writers and 
              creative people all over the world and aim to create a platform where they can earn with their talent or craft.
            </Text>

            <Text className="text-base leading-7 font-medium dark:text-white">
              Join us today and become part of our vibrant community!
            </Text>
          </View>

          <View className="mt-6 bg-gray-50 dark:bg-darker-200 rounded-lg p-4">
            <Text className="text-lg font-semibold mb-2 dark:text-white">
              Our Mission
            </Text>
            <Text className="text-base leading-6 dark:text-gray-300">
              To provide a platform where poets and poetry enthusiasts can connect, share, and celebrate the art of poetry while empowering 
              creators to earn from their craft.
            </Text>
          </View>

          <View className="bg-gray-50 dark:bg-darker-200 rounded-lg p-4">
            <Text className="text-lg font-semibold mb-2 dark:text-white">
              Our Vision
            </Text>
            <Text className="text-base leading-6 dark:text-gray-300">
              To become the world's leading social media platform for poets, fostering creativity, community, and commerce in the poetry space.
            </Text>
          </View>
        </View>
      
    </ScreenLayout>
  );
};