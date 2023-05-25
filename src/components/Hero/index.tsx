import React from "react";

import { useStyles } from "./classes";
import { Card, Typography } from "@mui/material";

export default function HeroSection() {
  const {classes} = useStyles()

  return (
    <Card className={classes.container}>
      <div className={classes.cardContents}>
        <Typography className={classes.text}>
          Hi! Welcome to my blog posts!
        </Typography>
        <Typography>
          This project is a personal project to practice NextJS and create a fullstack project with React.
        </Typography>
      </div>
    </Card>
  );
}
