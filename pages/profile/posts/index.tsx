import React from "react";

import useSWR from "swr";
import Link from "next/link";
import AccountLayout from "../layout";
import { useRouter } from "next/router";
import useUiStore from "@/store/uiStore";
import classes from "./profile-posts.module.scss";
import useAccountStore from "@/store/accountStore";

import { ModeEdit } from "@mui/icons-material";
import { PostProfileCards } from "@/components";
import { getFetcher } from "@/utils/fetch-functions";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { FeatPostCardsTypes } from "@/components/Posts/FeaturedPosts/FeatPostCards/types";

function AccountPosts() {
  const router = useRouter();
  const { uid } = useAccountStore((state: any) => state.user);
  const { data, mutate, isLoading } = useSWR(
    `/api/posts/fetch-posts/user?user=${uid}`,
    getFetcher
  );

  const openNotif = useUiStore((state: any) => state.openNotif);

  const fetchNewData = async () => {
    // enclose the whole fetch function in a new Promise
    // since it returns a Promise
    const data = new Promise(async (resolve) => {
      const response = await fetch(`/api/posts/fetch-posts/user?user=${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      resolve(response.json());
    });

    let message = "";

    // use then catch methods to "extract" the data
    data
      .then((res) => {
        // pass in data for mutate to return new post list
        // immediately
        mutate(res, true);
        message = "Successfully deleted your post!";
      })
      .catch(
        () =>
          (message =
            "There was a problem deleting your post. Please try again.")
      )
      .finally(() => openNotif({ status: true, text: message }));
  };

  return (
    <AccountLayout>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h4">Your Posts</Typography>
          <Link href={"posts/create"}>
            <Button className={classes.button}>
              <ModeEdit /> Create New Post
            </Button>
          </Link>
        </div>
        <div className={classes.content}>
          {isLoading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {data.map((post: FeatPostCardsTypes, index: number) => {
                return (
                  <PostProfileCards
                    key={post.key}
                    title={post.title}
                    image={post.image}
                    content={post.content}
                    excerpt={post.excerpt}
                    documentKey={post.key}
                    date={post.metadata.date}
                    slug={post.metadata.slug}
                    onDelete={fetchNewData}
                    editLink={`posts/edit?postKey=${post.key}`}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}

export default AccountPosts;
