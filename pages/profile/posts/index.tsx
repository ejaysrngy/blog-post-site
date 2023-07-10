import React from "react";
import Link from "next/link";
import AccountLayout from "../layout";
import classes from "./profile-posts.module.scss";

import { ModeEdit } from "@mui/icons-material";
import { getAllPosts } from "@/utils/posts-utils";
import { Button, Typography } from "@mui/material";
import { PostCards } from "@/components";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PostCardsTypes } from "@/components/Posts/PostCards/types";

function AccountPosts(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { postData } = props;

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
          {postData.map((post: PostCardsTypes, index: string) => {
            return (
              <PostCards
                key={index}
                date={post.date}
                slug={post.slug}
                image={post.image}
                title={post.title}
                content={post.content}
                excerpt={post.excerpt}
              />
            );
          })}
        </div>
      </div>
    </AccountLayout>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const result = getAllPosts();

  return {
    props: { postData: result },
  };
};

export default AccountPosts;
