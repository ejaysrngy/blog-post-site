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
          This project is a personal project to practice NextJS and create a fullstack project with React.
        </Typography>
      </Card>
    </div>
  );
}
