import { HeroSection, FeaturedPosts } from '@/components'

import { getFeaturedPosts } from '@/utils/posts-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

// THIS IS THE INDEX
export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {

  const {data} = props

  return (
    <>
      <HeroSection />
      <FeaturedPosts postsData={data}/>
    </>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const result = getFeaturedPosts();

  return {
    props: { data: result },
  };
};