import React from "react";

import Link from "next/link";
import useSWR from "swr";
import AccountLayout from "../../layout";
import classes from "../profile-posts.module.scss";

import { useRouter } from "next/router";
import { CreateEditPost } from "@/components";
import { getFetcher } from "@/utils/fetch-functions";
import { Button, Typography, CircularProgress } from "@mui/material";

function EditPost() {
  const router = useRouter();

  const { postKey } = router.query;

  const { data, isLoading } = useSWR(
    `/api/posts/fetch-posts/single-post?postKey=${postKey}`,
    getFetcher
  );
  
  return (
    <AccountLayout>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h4">Edit Post</Typography>
          <Link href={"/profile/posts"}>
            <Button className={classes.button}>Back</Button>
          </Link>
        </div>
        <div className={isLoading ? classes.loading : classes.content}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <CreateEditPost isEdit={true} editData={data.at(0)} />
          )}
        </div>
      </div>
    </AccountLayout>
  );
}

export default EditPost;
