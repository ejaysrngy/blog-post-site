import React from "react";
import Image from "next/image";

import { PostCardsTypes } from "./types";
import { Card, Typography } from "@mui/material";

import classes from "./postcards.module.scss";
import Link from "next/link";

const PostCards = (props: PostCardsTypes) => {
  const { excerpt, datePosted, imageFile, title, slug } = props;
  return (
    <Link href={`/posts/${slug}`} style={{textDecoration: 'none'}}>
      <Card className={classes.root}>
        <Image
          alt={title}
          width={300}
          height={300}
          src={imageFile}
          priority={false}
        />
        <div className={classes.textContainer}>
          <div>
            <Typography variant="h4">{title}</Typography>
            <Typography>Posted on: {datePosted}</Typography>
          </div>
          <div className={classes.descriptionContainer}> {excerpt} </div>
        </div>
      </Card>
    </Link>
  );
};

export default PostCards;
