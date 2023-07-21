import React from "react";
import classes from "./page.module.scss";

import { db } from "../api/firebase/config";
import { collection, getDocs } from "firebase/firestore";

import { PostCards } from "@/components";
import { Typography } from "@mui/material";
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
            <div key={crypto.randomUUID()}>
              <PostCards
                date={post.metadata?.date as any}
                excerpt={post.excerpt}
                image={post.image}
                title={post.title}
                slug={post.metadata?.slug as any}
                content={post.content}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let posts = [] as Array<object>;

  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    posts = [{ ...doc.data() }, ...posts];
  });

  return {
    props: { postData: posts },
  };
};
