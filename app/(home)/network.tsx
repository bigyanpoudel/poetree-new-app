import { Text } from "@/src/components";

import { Scafold } from "@/src/components";
import { MainAppBar } from "@/src/components/appbar/mainAppBar";
import React from "react";

export default function NetworkScreen() {
  return (
    <React.Fragment>
      <MainAppBar />
      <Scafold>
        <Text>Explore</Text>
      </Scafold>
    </React.Fragment>
  );
}
