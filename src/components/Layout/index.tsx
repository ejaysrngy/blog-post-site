import React from "react";
import Navigation from "./Navigation";

import { LayoutTypes } from "./types";
import classes from './layout.module.scss'

export default function MainLayout(props: LayoutTypes) {
  const { children } = props;
  return (
    <>
      <Navigation
        navLinks={[
          { name: "Home", link: "" },
          { name: "Posts", link: "posts" },
          { name: "Contact", link: "contact" },
        ]}
      />
      <main className={classes.main}>{children}</main>
    </>
  );
}
