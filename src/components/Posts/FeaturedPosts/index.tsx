import React from "react";
import FeatPostCards from "./FeatPostCards";
import classes from "./featured-post.module.scss";

import { Typography } from "@mui/material";
import { FeatPostsPageComponentTypes } from "./types";

export default function FeaturedPosts(props: FeatPostsPageComponentTypes) {
  const {postsData} = props
  console.log(typeof postsData[0].key)

  return (
    <section className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography>Featured Posts</Typography>
      </div>
      <div className={classes.featPostCardsContainer}>
        {postsData.map((post) => {
          return (
            <FeatPostCards
              key={post.key}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              content={post.content}
              image={post.image}
              datePosted={post.datePosted}
            />
          );
        })}
      </div>
    </section>
  );
}
