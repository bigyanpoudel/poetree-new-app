import { Scafold, Text } from "@/src/components/";
import React from "react";
import { View } from "react-native";

export const HomePoems = () => {
  console.log("poems-->");
  return (
    <Scafold
      style={{
        flex: 1, // This will ensure the container takes up the entire screen height
      }}
    >
      <Text>Hello world</Text>
    </Scafold>
  );
};
