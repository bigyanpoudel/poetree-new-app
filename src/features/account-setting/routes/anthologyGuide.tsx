import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  PenTool,
  Trophy,
  Users,
  AlertCircle,
} from "lucide-react-native";
import React from "react";
import { ScrollView, useColorScheme, View } from "react-native";

export const AnthologyGuideScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const steps = [
    {
      icon: Users,
      title: "Create an Account",
      description:
        "Sign up for a Poetree account to get started. You'll need an account to browse and participate in anthologies.",
    },
    {
      icon: Trophy,
      title: "Subscribe to Premium",
      description:
        "Anthology participation is a premium feature. Upgrade your account to unlock the ability to submit poems to curated collections.",
    },
    {
      icon: BookOpen,
      title: "Browse Anthologies",
      description:
        "Explore our collection of anthologies. Each anthology has a unique theme, submission deadline, and guidelines.",
    },
    {
      icon: PenTool,
      title: "Submit Your Poem",
      description:
        "Choose an anthology that resonates with you. Write or upload your poem, ensuring it aligns with the anthology's theme.",
    },
    {
      icon: CheckCircle,
      title: "Review & Approval",
      description:
        "Your submission will be reviewed by our curators. Approved poems will be featured in the published anthology.",
    },
  ];

  const guidelines = [
    {
      title: "Original Content",
      description:
        "Submit only original work that you have created. Plagiarism is strictly prohibited.",
    },
    {
      title: "Theme Alignment",
      description:
        "Ensure your poem aligns with the anthology's theme. Read the description carefully.",
    },
    {
      title: "Submission Deadline",
      description:
        "Submit your poem before the deadline. Late submissions will not be accepted.",
    },
    {
      title: "One Submission Per Anthology",
      description:
        "You can submit one poem per anthology. Choose your best work.",
    },
    {
      title: "Respectful Content",
      description:
        "Keep content appropriate and respectful. Offensive material will be rejected.",
    },
    {
      title: "Formatting",
      description:
        "Use the editor to format your poem. Line breaks and stanzas will be preserved.",
    },
  ];

  const benefits = [
    "Get featured in curated poetry collections",
    "Connect with fellow poets and poetry enthusiasts",
    "Gain exposure for your creative work",
    "Build your poetry portfolio",
    "Receive feedback and recognition",
    "Participate in themed creative challenges",
  ];

  return (
    <ScreenLayout
      appBar={{
        title: "Anthology Guide",
      }}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex flex-col gap-6 pb-8">
          {/* Header */}
          <View className="gap-3">
            <Text className="text-3xl font-bold dark:text-white">
              Anthology Participation Guide
            </Text>
            <Text className="text-base leading-6 text-gray-600 dark:text-gray-400">
              Learn how to join poetry anthologies and showcase your work in
              curated collections. Follow this guide to get started with your
              anthology journey.
            </Text>
          </View>

          {/* How to Participate Section */}
          <View className="bg-white dark:bg-darker-200 rounded-lg p-5 gap-5">
            <View className="flex flex-row items-center gap-3">
              <View className="w-10 h-10 bg-primary-500 dark:bg-primary-600 rounded-lg flex items-center justify-center">
                <FileText size={24} color="white" />
              </View>
              <Text className="text-xl font-bold dark:text-white">
                How to Participate
              </Text>
            </View>

            <View className="gap-5">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <View key={index} className="gap-3">
                    <View className="flex flex-row items-start gap-3">
                      <View className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent
                          size={20}
                          color={isDark ? "#93C5FD" : "#2563EB"}
                        />
                      </View>
                      <View className="flex-1 gap-1">
                        <Text className="font-semibold text-base dark:text-white">
                          {index + 1}. {step.title}
                        </Text>
                        <Text className="text-sm leading-5 text-gray-600 dark:text-gray-400">
                          {step.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Guidelines Section */}
          <View className="bg-white dark:bg-darker-200 rounded-lg p-5 gap-5">
            <View className="flex flex-row items-center gap-3">
              <View className="w-10 h-10 bg-primary-500 dark:bg-primary-600 rounded-lg flex items-center justify-center">
                <CheckCircle size={24} color="white" />
              </View>
              <Text className="text-xl font-bold dark:text-white">
                Submission Guidelines
              </Text>
            </View>

            <View className="gap-3">
              {guidelines.map((guideline, index) => (
                <View
                  key={index}
                  className="flex flex-row items-start gap-3 p-4 bg-gray-50 dark:bg-darker-100 rounded-lg"
                >
                  <CheckCircle
                    size={20}
                    color={isDark ? "#93C5FD" : "#2563EB"}
                    className="flex-shrink-0 mt-0.5"
                  />
                  <View className="flex-1 gap-1">
                    <Text className="font-semibold text-sm dark:text-white">
                      {guideline.title}
                    </Text>
                    <Text className="text-sm leading-5 text-gray-600 dark:text-gray-400">
                      {guideline.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Benefits Section */}
          <View className="bg-white dark:bg-darker-200 rounded-lg p-5 gap-5">
            <View className="flex flex-row items-center gap-3">
              <View className="w-10 h-10 bg-primary-500 dark:bg-primary-600 rounded-lg flex items-center justify-center">
                <Trophy size={24} color="white" />
              </View>
              <Text className="text-xl font-bold dark:text-white">
                Benefits of Participating
              </Text>
            </View>

            <View className="gap-2">
              {benefits.map((benefit, index) => (
                <View key={index} className="flex flex-row items-center gap-3">
                  <View className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full" />
                  <Text className="text-sm flex-1 text-gray-700 dark:text-gray-300">
                    {benefit}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Important Notes Section */}
          <View className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5 gap-3">
            <View className="flex flex-row items-center gap-2">
              <AlertCircle
                size={20}
                color={isDark ? "#FCD34D" : "#D97706"}
              />
              <Text className="font-semibold text-amber-900 dark:text-amber-200">
                Important Notes
              </Text>
            </View>
            <View className="gap-2 pl-4">
              <View className="flex flex-row items-start gap-2">
                <Text className="text-amber-800 dark:text-amber-300">•</Text>
                <Text className="text-sm flex-1 leading-5 text-amber-800 dark:text-amber-300">
                  Watch anthology deadlines carefully - extensions are not
                  granted
                </Text>
              </View>
              <View className="flex flex-row items-start gap-2">
                <Text className="text-amber-800 dark:text-amber-300">•</Text>
                <Text className="text-sm flex-1 leading-5 text-amber-800 dark:text-amber-300">
                  Check your submission status in the "My Submissions" section
                </Text>
              </View>
              <View className="flex flex-row items-start gap-2">
                <Text className="text-amber-800 dark:text-amber-300">•</Text>
                <Text className="text-sm flex-1 leading-5 text-amber-800 dark:text-amber-300">
                  Once submitted, you cannot edit your poem until the anthology
                  review is complete
                </Text>
              </View>
              <View className="flex flex-row items-start gap-2">
                <Text className="text-amber-800 dark:text-amber-300">•</Text>
                <Text className="text-sm flex-1 leading-5 text-amber-800 dark:text-amber-300">
                  Not all submissions will be accepted - curators select the
                  best fit for each anthology
                </Text>
              </View>
              <View className="flex flex-row items-start gap-2">
                <Text className="text-amber-800 dark:text-amber-300">•</Text>
                <Text className="text-sm flex-1 leading-5 text-amber-800 dark:text-amber-300">
                  Premium subscription is required for anthology participation
                </Text>
              </View>
            </View>
          </View>

          {/* CTA Section */}
          <View className="items-center gap-3 pt-2">
            <Text className="text-2xl font-bold dark:text-white text-center">
              Ready to Get Started?
            </Text>
            <Text className="text-sm text-center text-gray-600 dark:text-gray-400">
              Visit the Anthologies section to browse available collections and
              submit your poems.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};
