import React from "react";
import Navigation from "./Navigation";
import useUiStore from "@/store/uiStore";
import classes from "./layout.module.scss";

import { LayoutTypes } from "./types";
import { Snackbar } from "@mui/material";

export default function MainLayout(props: LayoutTypes) {
  const { children } = props;
  const notification = useUiStore((state: any) => state.notification);
  const closeNotif = useUiStore((state: any) => state.closeNotif);

  return (
    <>
      <Navigation
        navLinks={[
          { name: "Home", link: "" },
          { name: "Posts", link: "posts" },
          { name: "Contact", link: "contact" },
        ]}
      />
      <Snackbar
        onClose={closeNotif}
        open={notification.status}
        autoHideDuration={5000}
        message={notification.text}
      />
      <main className={classes.main}>
        {children}
        {/* bg shapes */}
        {/* <div className={classes.bg}/> */}
      </main>
    </>
  );
}
