import { Text } from "@/src/components";

import { Scafold } from "@/src/components";
import { MainAppBar } from "@/src/components/appbar/mainAppBar";
import React from "react";

export default function ShopScreen() {
  return (
    <React.Fragment>
      <MainAppBar />
      <Scafold>
        <Text>Shop</Text>
      </Scafold>
    </React.Fragment>
  );
}
