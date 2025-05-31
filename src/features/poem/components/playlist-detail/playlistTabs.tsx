import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Tab } from "./tabs";

interface IQuestionTabsProps {
  activeTab: number;
  tabs: number[];
  isLoading?: boolean;
  handleTabChange: (activeTab: number) => void;
}

export const PlayListTabs: React.FC<IQuestionTabsProps> = ({
  activeTab,
  tabs,
  handleTabChange,
  isLoading = false,
}) => {
  console.log("activeTab", activeTab);
  return (
    <View className="w-full dark:bg-darker-100 bg-white border-b dark:border-ui-border/20 border-ui-border flex flex-row justify-end">
      <View className="flex items-center  overflow-hidden justify-center w-full">
        <View className="w-full flex flex-row items-center overflow-hidden">
          {/* Left Arrow */}
          <TouchableOpacity
            onPress={() => {
              const active = activeTab - 1;
              if (active < 1) return;
              handleTabChange(active);
            }}
            className="w-[44px] sm:w-[90px] h-[56px] border-r dark:border-ui-border/20 border-ui-border flex items-center justify-center"
          >
            <MaterialIcons
              name="arrow-back-ios-new"
              size={27}
              className="dark:text-white text-ligtTextColor"
            />
          </TouchableOpacity>

          {/* Tabs */}
          {isLoading ? (
            <View className="flex flex-row gap-x-4 w-full flex-1 items-center px-4">
              {/* Skeleton Loader */}
              {[...Array(4)].map((_, index) => (
                <View
                  key={index}
                  className="min-h-8 min-w-8 h-8 w-8 bg-gray-300 rounded-full"
                />
              ))}
            </View>
          ) : (
            <Tab
              onChange={(active) => {
                handleTabChange(active);
              }}
              activeTab={activeTab}
              tabs={tabs}
            />
          )}

          {/* Right Arrow */}
          <TouchableOpacity
            onPress={() => {
              const active = activeTab + 1;
              if (active > tabs.length) return;
              handleTabChange(active);
            }}
            className="w-[44px] sm:w-[90px] h-[56px] border-l dark:border-ui-border/20 border-ui-border flex items-center justify-center"
          >
            <MaterialIcons
              name="arrow-forward-ios"
              size={27}
              className="dark:text-darkTextColor text-ligtTextColor"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
