import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./featpostcards.module.scss";

import { Card, Typography } from "@mui/material";
import { FeatPostCardsTypes } from "./types";

function FeatPostCards(props: FeatPostCardsTypes) {
  const { excerpt, datePosted, image, title, slug } = props;

  return (
    <Link href={`/posts/${slug}`} style={{ textDecoration: "none" }}>
      <Card className={classes.container}>
        <div className={classes.imageContainer}>
          <Image
            alt={title}
            width={100}
            height={100}
            priority={false}
            src={image}
          />
        </div>
        <div className={classes.textSection}>
          <div className={classes.header}>
            <Typography variant="h6">{title}</Typography>
            <div>{datePosted}</div>
          </div>
          <div className={classes.description}>{excerpt}</div>
        </div>
      </Card>
    </Link>
  );
}

export default FeatPostCards