import React from "react";
import classes from "./page.module.scss";

import { Typography } from "@mui/material";
import { PostCards } from "@/components";
import { getAllPosts } from "@/utils/posts-utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { FeatPostCardsTypes } from "@/components/Posts/FeaturedPosts/FeatPostCards/types";

export default function AllPosts(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { postData } = props;

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Typography variant="h3">All Posts</Typography>
      </div>
      <div className={classes.postsContainer}>
        {postData.map((post: FeatPostCardsTypes) => {
          return (
            <PostCards
              key={post.key}
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
  );
}

export const getStaticProps: GetStaticProps = () => {
  const result = getAllPosts();

  return {
    props: { postData: result },
  };
};
