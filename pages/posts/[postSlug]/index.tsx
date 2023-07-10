import React from "react";

import { db } from "../../api/firebase/config";
import { collection, getDocs } from "firebase/firestore";

import { SinglePostComponent } from "@/components";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";

export default function SinglePostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { postData } = props;

  return <SinglePostComponent postDetails={postData} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  let postData;

  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    if (doc.data().metadata.slug == params?.postSlug) {
      postData = doc.data();
    }
  });

  return {
    props: {
      postData,
    },
  };
};

// this getStaticPaths gets ALL POSSIBLE PATHS based on the slug name
export const getStaticPaths: GetStaticPaths = async () => {
  let dbPaths = [] as Array<{ params: { postSlug: string } }>;

  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    dbPaths = [{ params: { postSlug: doc.data().metadata.slug } }, ...dbPaths];
  });

  return {
    paths: dbPaths,
    fallback: false,
  };
};
