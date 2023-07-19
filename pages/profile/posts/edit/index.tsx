import React from "react";
import Link from "next/link";
import AccountLayout from "../../layout";
import classes from "../profile-posts.module.scss";

import { CreateEditPost } from "@/components";
import { Button, Typography } from "@mui/material";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

function EditPost(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { postData } = props;

  const editData = postData.at(0);

  return (
    <AccountLayout>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h4">Edit Post</Typography>
          <Link href={"/profile/posts"}>
            <Button className={classes.button}>Back</Button>
          </Link>
        </div>
        <div className={classes.content}>
          <CreateEditPost isEdit={true} editData={editData} />
        </div>
      </div>
    </AccountLayout>
  );
}

export default EditPost;

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const response = await fetch(
    `
      http://localhost:3000/api/posts/fetch-posts/single-post?postKey=${query.postKey}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return {
    props: { postData: data },
  };
};
