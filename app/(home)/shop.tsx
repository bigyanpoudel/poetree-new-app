import { Text } from "@/src/components";

import { Scafold } from "@/src/components";
import { MainAppBar } from "@/src/components/appbar/mainAppBar";
import { MarketplacePage } from "@/src/features/marketplace/routes/marketplace";
import React from "react";

export default function ShopScreen() {
  return (
    <React.Fragment>
      <MainAppBar />
      <MarketplacePage />
    </React.Fragment>
  );
}
