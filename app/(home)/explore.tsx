import { MainAppBar } from "@/src/components/appbar/mainAppBar";
import { ExplorePage } from "@/src/features/explore/routes/explore";
import React from "react";

export default function ExporeScreen() {
  return (
    <React.Fragment>
      <MainAppBar />
      <ExplorePage />
    </React.Fragment>
  );
}
