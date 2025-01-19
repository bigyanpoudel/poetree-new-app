import { Scafold, Text } from "@/src/components/";
import { Colors } from "@/src/utils/constant/colors";
import React from "react";
import { useColorScheme, View } from "react-native";

export const HomeTrending = () => {
  console.log("trending poems-->");
  const colorSchema = useColorScheme();
  const isDarked = colorSchema == "dark";
  return (
    <Scafold
      style={{
        flex: 1, // This will ensure the container takes up the entire screen height
      }}
    >
      <Text>Hello world new trending</Text>
    </Scafold>
  );
};
