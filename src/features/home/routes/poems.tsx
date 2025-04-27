import { Scafold, Text } from "@/src/components/";
import { Poem } from "@/src/components/poem";
import { POEMS } from "@/src/utils/constant/appConstant";
import React from "react";
import { ScrollView, View } from "react-native";
import { Divider } from "react-native-paper";

export const HomePoems = () => {
  return (
    <Scafold paddingHorizontal={0}>
      <View className="flex flex-col gap-4">
        {POEMS.map((poem) => (
          <Poem poem={poem} key={poem.slug + poem.title} />
        ))}
      </View>
    </Scafold>
  );
};
