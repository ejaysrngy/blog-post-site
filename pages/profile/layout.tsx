import React from "react";
import Link from "next/link";
import classes from "./account-page.module.scss";

import { Typography } from "@mui/material";

function AccountLayout(props: { children: JSX.Element }) {
  const { children } = props;
  return (
    <div className={classes.root}>
      <aside className={classes.sidebar}>
        <div className={classes.name}>
          <Typography variant="h5">Your Name</Typography>
        </div>
        <div className={classes.menu}>
          {(
            [
              { name: "Account", link: "/profile" },
              { name: "Your Posts", link: "profile/posts" },
            ] as const
          ).map((item, index) => {
            return (
              <Link href={item.link} key={index}>
                <Typography>{item.name}</Typography>
              </Link>
            );
          })}
        </div>
      </aside>
      <div className={classes.contents}>{children}</div>
    </div>
  );
}

export default AccountLayout;
