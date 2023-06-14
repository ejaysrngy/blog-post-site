import React from "react";
import AccountLayout from "../layout";
import classes from './profile-posts.module.scss'

import { Typography } from "@mui/material";
import { getAllPosts } from "@/utils/posts-utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PostCardsTypes } from "@/components/Posts/PostCards/types";

import { PostCards } from "@/components";

function AccountPosts(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { postData } = props;

  return (
    <AccountLayout>
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h4"> Your POSTS </Typography>
        </div>
        <div className={classes.posts}>
          {postData.map((post: PostCardsTypes) => {
            return (
              <PostCards
                date={post.date}
                excerpt={post.excerpt}
                image={post.image}
                title={post.title}
                slug={post.slug}
                content={post.content}
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
