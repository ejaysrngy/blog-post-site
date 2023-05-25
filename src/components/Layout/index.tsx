import React from "react";
import Navigation from "./Navigation";

import { LayoutTypes } from "./types";

export default function MainLayout(props: LayoutTypes) {
  const { children } = props;
  return (
    <div>
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
