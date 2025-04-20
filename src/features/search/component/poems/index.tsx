import { Scafold } from "@/src/components";
import { Poem } from "@/src/components/poem";
import { IAppPoem } from "@/src/types";
import { POEMS } from "@/src/utils/constant/appConstant";
import React from "react";
import { FlatList, View } from "react-native";

export const SearchPoemList = () => {
  return (
    <Scafold>
      <FlatList
        data={POEMS}
        renderItem={(poem: any) => <Poem poem={POEMS[0]} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </Scafold>
  );
};
