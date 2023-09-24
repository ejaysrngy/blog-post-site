import React from "react";

import useSWR from "swr";
import Link from "next/link";
import AccountLayout from "../layout";
import useUiStore from "@/store/uiStore";
import classes from "./profile-page-posts.module.scss";
import useAccountStore from "@/store/accountStore";
import { useSWRConfig } from "swr";

import { ModeEdit } from "@mui/icons-material";
import { PostProfileCards } from "@/components";
import { getFetcher } from "@/utils/fetch-functions";
import { deleteData } from "../../../firebase";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { FeatPostCardsTypes } from "@/components/Posts/FeaturedPosts/FeatPostCards/types";

function AccountPosts() {
  const { uid } = useAccountStore((state: any) => state.user);
  const { data, mutate, isLoading } = useSWR(
    `/api/posts/fetch-posts/user?user=${uid}`,
    getFetcher,
    {
      initialData: [],
      revalidateOnMount: true,
    }
  );
  const { cache } = useSWRConfig();

  const openNotif = useUiStore((state: any) => state.openNotif);

  const fetchNewData = async () => {
    // enclose the whole fetch function in a new Promise
    // since it returns a Promise
    let message = "";

    const response = await fetch(`/api/posts/fetch-posts/user?user=${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      await response.json();
      message = "Successfully deleted your post!";
    } catch (err) {
      message = "There was a problem deleting your post. Please try again.";
    }

    openNotif({ status: true, text: message });
    // delete cached data list
    cache.delete(`/api/posts/fetch-posts/user?user=${uid}`);
    // refetch data to show updated list
    // TODO: optimize user experience
    mutate();
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
        <div className={isLoading ? classes.loading : classes.content}>
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
                    date={post.metadata?.date as any}
                    slug={post.metadata?.slug as any}
                    onDelete={() => {
                      fetchNewData();
                      deleteData("posts", post.key);
                    }}
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
