import React from "react";
import classes from './hero.module.scss'

import { Card, Typography } from "@mui/material";

export default function HeroSection() {

  return (
    <div className={classes.container}>
      <Card className={classes.cardContents}>
        <Typography className={classes.text}>
          Hi! Welcome to my blog posts!
        </Typography>
        <Typography>
          This is a personal project for me to practice NextJS and learn the ins and outs of a Fullstack project
        </Typography>
      </Card>
    </div>
  );
}
