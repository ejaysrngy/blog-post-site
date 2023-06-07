import React from "react";
import FeatPostCards from "./FeatPostCards";
import classes from "./featured-post.module.scss";

import { Typography } from "@mui/material";
import { FeatPostsPageComponentTypes } from "./types";

export default function FeaturedPosts(props: FeatPostsPageComponentTypes) {
  const {postsData} = props

  return (
    <section className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography>Featured Posts</Typography>
      </div>
      <div className={classes.featPostCardsContainer}>
        {postsData.map((post) => {
          return (
            <FeatPostCards
              key={crypto.randomUUID()}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              content={post.content}
              image={post.image}
              date={post.date}
            />
          );
        })}
      </div>
    </section>
  );
}
