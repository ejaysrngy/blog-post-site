import React from "react";
import Link from "next/link";
import classes from './navigation.module.scss'

import { NavigationTypes } from "./types";


export default function Navigation(props: NavigationTypes) {
  const { navLinks } = props;

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.navlists}>
          {navLinks?.map((item, index) => {
            return (
              <li key={index}>
                <Link href={`/${item.link}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
