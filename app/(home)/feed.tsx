import { MainAppBar } from "@/src/components/appbar/mainAppBar";
import { HomeYourFeed } from "@/src/features/home/routes/yourFeed";
import React from "react";

export default function ExporeScreen() {
  return (
    <React.Fragment>
      <MainAppBar />
      <HomeYourFeed />
    </React.Fragment>
  );
}
