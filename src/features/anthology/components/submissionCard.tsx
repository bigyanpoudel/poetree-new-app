import { PoemBody } from "@/src/components/poem/helper/poemBody";
import { Text } from "@/src/components/text";
import { IPoemSubmission, SubmissionStatusEnum } from "@/src/types";
import classnames from "classnames";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface ISubmissionCardProps {
  submission: IPoemSubmission;
  onPress?: (submission: IPoemSubmission) => void;
  className?: string;
}

export const SubmissionCard: React.FC<ISubmissionCardProps> = ({
  submission,
  onPress,
  className,
}) => {
  const getStatusColor = (status: SubmissionStatusEnum) => {
    switch (status) {
      case SubmissionStatusEnum.PENDING:
        return "bg-yellow-400 text-yellow-800";
      case SubmissionStatusEnum.ACCEPTED:
        return "bg-green-400 text-green-800";
      case SubmissionStatusEnum.REJECTED:
        return "bg-red-400 text-red-800";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      onPress={() => onPress?.(submission)}
      className={classnames("overflow-hidden dark:bg-darker-100 bg-white", className)}
      activeOpacity={0.7}
    >
      <View className="p-4">
        {/* Header with status */}
        <View className="flex-row justify-between items-start mb-1">
          <View className="flex-1">
            <Text className="text-lg  uppercase" fontWeight={700}>
              {submission.poem.title}
            </Text>
          
          </View>
          <View
            className={classnames(
              "px-2 py-1 rounded-full ml-2",
              getStatusColor(submission.status)
            )}
          >
            <Text className="text-xs font-medium capitalize" fontWeight={500}>
              {submission.status}
            </Text>
          </View>
        </View>

        {/* Content preview */}
        <View className="mb-3">
          <PoemBody
            poem={{
              body: submission.poem.content ?? "",
            } as any}
            onShowMore={() => {
              onPress?.(submission);
            }}
            maxLines={3}
          />
        </View>

        {/* Footer info */}
        <View className="flex-row justify-between items-center">
          <Text className="text-xs opacity-60" fontWeight={400}>
            Submitted At: {formatDate(submission.submittedAt)}
          </Text>
          {submission.status === SubmissionStatusEnum.REJECTED && submission.rejectionReason && (
            <Text className="text-xs text-red-600 dark:text-red-400" fontWeight={500}>
              View reason
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};