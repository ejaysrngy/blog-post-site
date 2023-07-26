import React from "react";
import Link from "next/link";
import classes from "./post-profile.module.scss";

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
      <Card sx={{ width: "30vw" }}>
        <CardMedia component="img" height="200" image={image} alt={image} />
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
          <IconButton
            onClick={() => {
              deleteData("posts", documentKey as string);
              onDelete();
            }}
          >
            <Delete color={"inherit"} />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default PostProfileCards;
