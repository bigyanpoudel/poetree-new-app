import { Scafold } from "@/src/components";
import { UserProfileCard } from "@/src/components/user/userCard";
import React from "react";
import { FlatList, View } from "react-native";

export const SearchUserList = () => {
  return (
    <Scafold>
      <FlatList
        data={[{ id: "12" }, { id: "123" }]}
        renderItem={() => <UserProfileCard />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </Scafold>
  );
};
