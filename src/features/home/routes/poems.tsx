import { Scafold, Text } from "@/src/components/";
import { Poem } from "@/src/components/poem";
import { POEMS } from "@/src/utils/constant/appConstant";
import React from "react";
import { ScrollView, View } from "react-native";
import { Divider } from "react-native-paper";

export const HomePoems = () => {
  return (
    <Scafold
      style={{
        flex: 1, // This will ensure the container takes up the entire screen height
      }}
    >
      <View className="flex flex-col gap-4">
        {POEMS.map((poem) => (
          <React.Fragment key={poem.slug + poem.title}>
            <Poem poem={poem} />
            <Divider className="mb-4 mt-1" />
          </React.Fragment>
        ))}
      </View>
    </Scafold>
  );
};
