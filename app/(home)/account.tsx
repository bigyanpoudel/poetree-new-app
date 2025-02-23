import { Text } from "@/src/components";

import { Scafold } from "@/src/components";
import { MainAppBar } from "@/src/components/appbar/mainAppBar";
import { AccountSetting } from "@/src/features/account-setting/routes/accountSetting";
import React from "react";

export default function NetworkScreen() {
  return (
    <React.Fragment>
      <MainAppBar />
      <AccountSetting />
    </React.Fragment>
  );
}
