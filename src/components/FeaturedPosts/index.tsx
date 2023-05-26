import React from "react";
import FeatPostCards from "./FeatPostCards";
import classes from "./featured-post.module.scss";

import { Typography } from "@mui/material";

const testData = [
  {
    datePosted: "05/25/2023",
    description: "Test desciprtionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    imageFile:
      "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png/revision/latest?cb=20210827150137",
    key: 1,
    title: "Test Title",
  },
  {
    datePosted: "05/25/2023",
    description: "Test desciprtionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    imageFile:
      "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png/revision/latest?cb=20210827150137",
    key: 2,
    title: "Test Title",
  },
  {
    datePosted: "05/25/2023",
    description: "Test desciprtionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    imageFile:
      "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png/revision/latest?cb=20210827150137",
    key: 3,
    title: "Test Title",
  },
];

export default function FeaturedPosts() {
  return (
    <section className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography>Featured Posts</Typography>
      </div>
      <div className={classes.featPostCardsContainer}>
        {testData.map((post, index) => {
          return (
            <FeatPostCards
              key={post.key}
              datePosted={post.datePosted}
              description={post.description}
              imageFile={post.imageFile}
              title={post.title}
            />
          );
        })}
      </div>
    </section>
  );
}
