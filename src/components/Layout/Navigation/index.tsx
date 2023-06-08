import React, { useState } from "react";
import Link from "next/link";
import classes from "./navigation.module.scss";

import { NavigationTypes } from "./types";
import { Button, Popover } from "@mui/material";
import { SignUpLoginContainer } from "@/components";

export default function Navigation(props: NavigationTypes) {
  const { navLinks } = props;
  const [popoverEl, setPopoverEl] = useState<EventTarget & HTMLButtonElement | null>(null);

  const popoverOpen = Boolean(popoverEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverEl(event.currentTarget);
  };

  const handleClose = () => {
    setPopoverEl(null);
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.logo}>Test</div>
        <ul className={classes.navlists}>
          {navLinks?.map((item, index) => {
            return (
              <li key={index}>
                <Link href={`/${item.link}`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
        <div className={classes.login}>
          <Button variant="contained" onClick={handleClick}>
            Sign Up / Login
          </Button>
          <Popover
            open={popoverOpen}
            anchorEl={popoverEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <SignUpLoginContainer />
          </Popover>
        </div>
      </nav>
    </header>
  );
}
