import { PlaylistCard } from "@/src/components/playlist";
import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

export const ListPlaylist = () => {
  return (
    <View className="flex flex-1 flex-col gap-4 px-5">
      {/* {POEMS.map((poem) => (
        <React.Fragment key={poem.slug + poem.title}>
          <Poem poem={poem} />
          <Divider className="mb-4 mt-1" />
        </React.Fragment>
      ))} */}
      <PlaylistCard
        style={{
          width: "100%",
        }}
      />
      <Divider className="mb-4 mt-1" />
      <PlaylistCard
        style={{
          width: "100%",
        }}
      />
      <Divider className="mb-4 mt-1" />
    </View>
  );
};
