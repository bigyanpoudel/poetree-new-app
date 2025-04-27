// Tab.tsx
import React, { useEffect, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface TabProps {
  tabs: number[];
  activeTab: number;
  onChange: (index: number) => void;
}

export const Tab: React.FC<TabProps> = ({ tabs, activeTab, onChange }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const tabRefs = useRef<any[]>([]);

  useEffect(() => {
    centerActiveTab();
  }, [activeTab]);

  const centerActiveTab = () => {
    if (!scrollViewRef.current || !tabRefs.current[activeTab]) return;

    tabRefs.current[activeTab]?.measureLayout(
      scrollViewRef.current.getScrollableNode
        ? scrollViewRef.current.getScrollableNode()
        : scrollViewRef.current, // fallback
      (x: any, y: any, width: any, height: any) => {
        scrollViewRef.current?.scrollTo({
          x: x - 150 + width / 2, // adjust as needed
          animated: true,
        });
      },
      (error: any) => {
        console.log("measure error", error);
      }
    );
  };

  return (
    <View className="py-3 px-4 max-w-[75%]">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex items-center gap-3 space-x-[10px]"
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-black" : "bg-gray-200"
            }`}
            onPress={() => onChange(tab)}
          >
            <Text
              className={`${
                activeTab === tab ? "text-white font-bold" : "text-gray-800"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
