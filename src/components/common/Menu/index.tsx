import React from "react";
import classes from "./menu.module.scss";

import Link from "next/link";
import { MenuPropTypes } from "./types";
import { Menu, MenuItem } from "@mui/material";

function MenuComponent(props: MenuPropTypes) {
  const { anchorEl, items, open, handleCloseMenu } = props;

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      className={classes.root}
      onClose={handleCloseMenu}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {items.map((item) => {
        return (
          <MenuItem onClick={item.handeClickFn} key={item.key}>
            {item.isLink ? (
              <Link href={`/${item.link}`}>{item.name}</Link>
            ) : (
              item.name
            )}
          </MenuItem>
        );
      })}
    </Menu>
  );
}

export default MenuComponent;
