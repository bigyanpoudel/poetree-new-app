import { Scafold } from "@/src/components";
import { PlaylistCard } from "@/src/components/playlist";
import React from "react";
import { FlatList, View } from "react-native";

export const SearchPaylist = () => {
  const data = [
    {
      id: "1",
      thumbnail: "https://example.com/thumbnail1.jpg",
      title: "Item 1",
      subtitle: "Subtitle 1",
    },
    {
      id: "2",
      thumbnail: "https://example.com/thumbnail2.jpg",
      title: "Item 2",
      subtitle: "Subtitle 2",
    },
    {
      id: "3",
      thumbnail: "https://example.com/thumbnail3.jpg",
      title: "Item 3",
      subtitle: "Subtitle 3",
    },
  ];
  return (
    <Scafold>
      <FlatList
        data={data}
        renderItem={() => (
          <PlaylistCard
            style={{
              width: "100%",
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </Scafold>
  );
};
