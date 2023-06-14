import React from "react";
import Image from "next/image";

import { PostCardsTypes } from "./types";
import { Card, Typography } from "@mui/material";

import classes from "./postcards.module.scss";
import Link from "next/link";

const PostCards = (props: PostCardsTypes) => {
  const { excerpt, date, image, title, slug } = props;

  const convertedDate = new Date(date).toISOString().substring(0, 10);

  return (
    <Link href={`/posts/${slug}`} style={{ textDecoration: "none" }}>
      <Card className={classes.root}>
        <div className={classes.imageContainer}>
          <Image
            alt={title}
            width={300}
            height={300}
            src={image}
            priority={false}
          />
        </div>
        <div className={classes.textContainer}>
          <div className={classes.titleDate}>
            <Typography variant="h5">{title}</Typography>
            <Typography>Posted on: {convertedDate}</Typography>
          </div>
          <div className={classes.descriptionContainer}> {excerpt} </div>
        </div>
      </Card>
    </Link>
  );
};

export default PostCards;
