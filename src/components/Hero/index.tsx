import React from "react";
import classes from "./hero.module.scss";
import { Poppins } from "next/font/google";

import { Card, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <div className={classes.container}>
      <div className={classes.cardContents}>
        <Typography className={classes.title}>
          Hi! Welcome to my blog posts!
        </Typography>
        <Typography className={classes.subtext}>
          This is a personal project for me to practice NextJS and learn the ins
          and outs of a Fullstack project
        </Typography>
      </div>
    </div>
  );
}
