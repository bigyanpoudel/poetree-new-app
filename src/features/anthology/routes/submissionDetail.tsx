import { ScreenLayout } from "@/src/components/layout";
import { PoemBody } from "@/src/components/poem/helper/poemBody";
import { Text } from "@/src/components/text";
import { IPoemSubmission, SubmissionStatusEnum } from "@/src/types";
import { getCreatedDate } from "@/src/utils/poemDateFormat";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import classnames from "classnames";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export const SubmissionDetail = () => {
  const { submission: submissionParam } = useLocalSearchParams<{ submission: string }>();
  
  const submission: IPoemSubmission = submissionParam ? JSON.parse(submissionParam) : null;

  if (!submission) {
    return (
      <ScreenLayout
        appBar={{
          title: "Submission Detail",
        }}
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg opacity-60">Submission not found</Text>
        </View>
      </ScreenLayout>
    );
  }

  const getStatusBadge = (status: SubmissionStatusEnum) => {
    switch (status) {
      case SubmissionStatusEnum.PENDING:
        return "bg-yellow-500 text-white";
      case SubmissionStatusEnum.ACCEPTED:
        return "bg-green-500 text-white";
      case SubmissionStatusEnum.REJECTED:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <ScreenLayout
      appBar={{
        title: "Submission Detail",
      }}
    >
      {/* Status Header */}
      <View className="mb-6 p-5 bg-white dark:bg-darker-100 rounded-xl border border-ui-border dark:border-ui-border/20 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center">
              <Feather name="file-text" size={20} color="#3B82F6" />
            </View>
            <View>
              <Text className="text-lg" fontWeight={700}>
                Your Submission
              </Text>
              <Text className="text-sm opacity-60" fontWeight={500}>
                {getCreatedDate(submission.submittedAt)}
              </Text>
            </View>
          </View>
          <View
            className={classnames(
              "px-4 py-2 rounded-full flex-row items-center gap-2",
              getStatusBadge(submission.status)
            )}
          >
            {submission.status === SubmissionStatusEnum.PENDING && (
              <MaterialIcons name="pending" size={14} color="white" />
            )}
            {submission.status === SubmissionStatusEnum.ACCEPTED && (
              <Ionicons name="checkmark-circle" size={14} color="white" />
            )}
            {submission.status === SubmissionStatusEnum.REJECTED && (
              <MaterialIcons name="cancel" size={14} color="white" />
            )}
            <Text className="text-xs font-medium capitalize text-white" fontWeight={600}>
              {submission.status}
            </Text>
          </View>
        </View>
      </View>

      {/* Anthology Information Section */}
      {submission.anthology && (
        <View className="mb-6 p-5 bg-white dark:bg-darker-100 rounded-xl border border-ui-border dark:border-ui-border/20">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 items-center justify-center">
              <Ionicons name="library" size={16} color="#8B5CF6" />
            </View>
            <Text className="text-base" fontWeight={700}>
              Anthology Details
            </Text>
          </View>
          <Text className="text-xl mb-2 px-2" fontWeight={700}>
            {submission.anthology.title}
          </Text>
          {submission.anthology.theme && (
            <View className="flex-row items-center gap-2 px-2">
              <Feather name="tag" size={14} color="#6B7280" />
              <Text className="text-sm opacity-70" fontWeight={500}>
                {submission.anthology.theme}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Poem Content Section */}
      <View className="mb-6 p-5 bg-white dark:bg-darker-100 rounded-xl border border-ui-border dark:border-ui-border/20">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center">
            <Feather name="edit-3" size={16} color="#10B981" />
          </View>
          <Text className="text-base" fontWeight={700}>
            Your Poem
          </Text>
        </View>
        <Text
          fontWeight={800}
          className="text-[24px] garamond -tracking-[0.5px] font-extrabold mb-4 px-2"
        >
          {submission.poem.title}
        </Text>
        <Divider className="mb-4 opacity-30" />
        <View className="px-2">
          <PoemBody
            poem={{
              body: submission.poem.content ?? "",
            } as any}
            maxLines={0}
          />
        </View>
      </View>

      {/* Rejection Reason Alert */}
      {submission.status === SubmissionStatusEnum.REJECTED && submission.rejectionReason && (
        <View className="mb-6 p-5 bg-red-50 dark:bg-red-900/20 rounded-xl border-l-4 border-red-500">
          <View className="flex-row items-start gap-3">
            <View className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 items-center justify-center mt-1">
              <MaterialIcons name="info-outline" size={16} color="#EF4444" />
            </View>
            <View className="flex-1">
              <Text className="text-red-800 dark:text-red-200 text-base mb-2" fontWeight={700}>
                Feedback from Editors
              </Text>
              <Text className="text-red-700 dark:text-red-300 text-sm leading-5">
                {submission.rejectionReason}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScreenLayout>
  );
};