import React from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import classnames from "classnames";
import { Text } from "../text";
import { Button } from "../button";
import { FastImageComponent } from "../image";
import { IAppAnthology } from "../../types";

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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-400 text-green-800";
      case "completed":
        return "bg-blue-400 text-blue-800";
      case "published":
        return "bg-purple-400 text-purple-800";
      case "cancelled":
        return "bg-red-400 text-red-800";
      default:
        return "bg-gray-400 text-gray-800";
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
              "px-2 py-1 rounded-full",
              getStatusColor(anthology.status)
            )}
          >
            <Text className="text-xs font-medium capitalize" fontWeight={500}>
              {anthology.status}
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