import { Poem } from "@/src/components/poem";
import { POEMS } from "@/src/utils/constant/appConstant";
import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export const ListPeoms = () => {
  return (
    <View className="flex flex-1 flex-col gap-4">
      {POEMS.map((poem) => (
        <React.Fragment key={poem.slug + poem.title}>
          <Poem poem={poem} />
          <Divider className="mb-4 mt-1" />
        </React.Fragment>
      ))}
    </View>
  );
};
