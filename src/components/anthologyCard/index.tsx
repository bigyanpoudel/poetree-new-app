import React from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import classnames from "classnames";
import { Text } from "../text";
import { Button } from "../button";
import { FastImageComponent } from "../image";
import { AnthologyStatusEnum, IAppAnthology } from "../../types";
import dayjs from "dayjs";

interface IAnthologyCardProps {
  anthology: IAppAnthology;
  onReadMore: (anthology: IAppAnthology) => void;
  className?: string;
}

export const AnthologyCard: React.FC<IAnthologyCardProps> = ({
  anthology,
  onReadMore,
  className,
}) => {
  // Check if deadline has passed
  const isDeadlinePassed = anthology?.submissionDeadline
    ? dayjs().isAfter(dayjs(anthology.submissionDeadline))
    : false;

  // Determine actual status based on deadline
  const actualStatus = anthology?.status !== AnthologyStatusEnum.Completed && isDeadlinePassed
    ? AnthologyStatusEnum.Completed
    : anthology?.status;

  const getStatusColor = (status: string, isPassed: boolean) => {
    // If deadline passed or status is completed, show green
    if (status === AnthologyStatusEnum.Completed || isPassed) {
      return "bg-ui-success";
    }
    // If ongoing and not passed, show orange
    if (status === AnthologyStatusEnum.Ongoing && !isPassed) {
      return "bg-orange-400";
    }
    // Other statuses
    switch (status) {
      case AnthologyStatusEnum.PUBLISHED:
        return "bg-purple-400";
      case AnthologyStatusEnum.CANCELLED:
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <View className={classnames("m-2 overflow-hidden rounded-md bg-white dark:bg-darker-100", className)}>
      <View className="relative">
        <FastImageComponent
          source={anthology.coverImage}
          className="w-full h-48"
        />
        <View className="absolute top-2 right-2">
          <View
            className={classnames(
              "px-2 py-1 rounded-sm",
              getStatusColor(anthology.status, isDeadlinePassed)
            )}
          >
            <Text className="text-xs text-white font-bold uppercase tracking-wider" fontWeight={700}>
              {actualStatus}
            </Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-lg mb-2" fontWeight={700}>
          {anthology.title}
        </Text>

        <Button
          mode="contained"
          onPress={() => onReadMore(anthology)}
          className="mt-2"
        >
          Read More
        </Button>
      </View>
    </View>
  );
};