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
console.log("activeTab", tabs);
return (
  <View className="py-3 flex-1 px-4 max-w-[75%]">
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="flex items-center gap-3 space-x-[10px]"
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index + "pl-number"}
          onPress={() => onChange(tab)}
        >
          <View
            className={`w-9 min-w-9 min-h-9 h-9  flex items-center justify-center rounded-full ${
              activeTab === tab ? "bg-black" : "bg-gray-200"
            }`}
          >
            <Text
              className={`${
                activeTab === tab ? "text-white font-bold" : "text-gray-800"
              }`}
              style={{
                fontFamily:
                  activeTab === tab ? "Poximanova700" : "Poximanova600",
              }}
            >
              {tab}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);
};
