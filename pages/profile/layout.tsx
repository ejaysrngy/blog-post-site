import React from "react";
import Link from "next/link";
import classes from "./layout.module.scss";
import useAccountStore from "@/store/accountStore";

import { Typography, CircularProgress } from "@mui/material";

function AccountLayout(props: { isLoading?: Boolean; children: JSX.Element }) {
  const { children, isLoading } = props;
  const user = useAccountStore((state) => state.user);

  const { email, username } = user;

  return (
    <div className={classes.root}>
      <aside className={classes.sidebar}>
        <div className={classes.name}>
          <Typography variant="h5">
            Hello, {username ? username : email}!
          </Typography>
        </div>
        <div className={classes.menu}>
          {(
            [
              { name: "Account", link: "/profile" },
              { name: "Your Posts", link: "/profile/posts" },
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
      <div className={classes.contents}>
        {isLoading ? <CircularProgress /> : children}
      </div>
    </div>
  );
}

export default AccountLayout;
