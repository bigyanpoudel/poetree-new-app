import { Button, Scafold, Text } from "@/src/components/";
import React from "react";

export const HomeYourFeed = () => {
  console.log("okay poems-->");
  return (
    <Scafold
      style={{
        flex: 1, // This will ensure the container takes up the entire screen height
      }}
    >
      <Text>Hello world</Text>
      <Button mode="contained">Hello</Button>
    </Scafold>
  );
};
