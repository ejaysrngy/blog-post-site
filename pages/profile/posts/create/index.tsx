import React from "react";
import Link from "next/link";
import AccountLayout from "../../layout";
import classes from "../profile-posts.module.scss";

import { CreateEditPost } from "@/components";
import { Button, Typography } from "@mui/material";

function CreateNewPost() {
  return (
    <AccountLayout>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h4">Create New Post</Typography>
          <Link href={"/profile/posts"}>
            <Button className={classes.button}>Back</Button>
          </Link>
        </div>
        <div className={classes.content}>
          <CreateEditPost isEdit={false} />
        </div>
      </div>
    </AccountLayout>
  );
}

export default CreateNewPost;
