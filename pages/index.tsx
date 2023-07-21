import { HeroSection, FeaturedPosts } from "@/components";

import { db } from "./api/firebase/config";
import { collection, getDocs } from "firebase/firestore";

import { GetStaticProps, InferGetStaticPropsType } from "next";

// THIS IS THE INDEX
export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { postData } = props;

  return (
    <>
      <HeroSection />
      <FeaturedPosts postsData={postData} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let posts = [] as Array<object>;

  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    posts = [{ ...doc.data() }, ...posts];
  });

  //shuffle the array to get 2 random posts to show as featured

  const randomIndexes: number[] = [];

  while (randomIndexes.length < 2) {
    const randomIndex = Math.floor(Math.random() * posts.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }

  const newPosts = randomIndexes.map((index) => posts[index]);

  return {
    props: { postData: newPosts },
  };
};
