import React from "react";
import Link from "next/link";
import classes from "./post-profile.module.scss";
import Image from "next/image";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { PostProfileCardTypes } from "./types";
import { ModeEdit, Delete } from "@mui/icons-material";
import { deleteData } from "../../../../firebase";

function PostProfileCards(props: PostProfileCardTypes) {
  const { excerpt, date, image, title, documentKey, onDelete, editLink } =
    props;

  const convertedDate = date.substring(0, 10);

  return (
    <div className={classes.root}>
      <Card className={classes.cardRoot}>
        <div className={classes.imageContainer}>
          <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
        </div>
        <CardContent className={classes.content}>
          <Typography variant="h5" component="div" className={classes.title}>
            {title}
          </Typography>
          <Typography>Posted on: {convertedDate}</Typography>
          <Typography className={classes.excerpt}>{excerpt}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link href={editLink}>
            <IconButton>
              <ModeEdit color={"inherit"} />
            </IconButton>
          </Link>
          <IconButton onClick={onDelete}>
            <Delete color={"inherit"} />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default PostProfileCards;
