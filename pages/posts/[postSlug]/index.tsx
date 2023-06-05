import React from "react";

import { getAllPosts, getPostData } from "@/utils/posts-utils";
import { SinglePostComponent } from "@/components";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";

export default function SinglePostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { postData } = props;

  return <SinglePostComponent postDetails={postData} />;
}

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context;

  let postData;
  if (params) {
    postData = getPostData(`${params.postSlug as string}.md`);
  }

  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getAllPosts();
  const allPaths = allPosts.map((item) => {
    return { params: { postSlug: item?.slug } };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
};
