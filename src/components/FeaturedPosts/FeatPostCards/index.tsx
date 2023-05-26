import React from "react";
import Image from "next/image";
import classes from './featpostcards.module.scss'

import { Card } from "@mui/material";
import { FeatPostCardsTypes } from "./types";

export default function FeatPostCards(props: FeatPostCardsTypes) {
  const { description, datePosted, imageFile, title } = props;
  return (
    <Card className={classes.container}>
      <div className={classes.imageContainer}>
        <Image src={imageFile} alt={title} fill/>
      </div>
      <div className={classes.textSection}>
        <div className={classes.header}>
          <div>{title}</div>
          <div>{datePosted}</div>
        </div>
        <div className={classes.description}>{description}</div>
      </div>
    </Card>
  );
}
