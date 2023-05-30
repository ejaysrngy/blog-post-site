import React from 'react'
import classes from "./page.module.scss"


import { testData } from '@/const/const'
import { Typography } from '@mui/material'
import { PostCards } from '@/components'

export default function AllPosts() {
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <Typography variant='h3'>
          All Posts
        </Typography>
      </div>
      <div className={classes.postsContainer}>
      {testData.map((post) => {
          return (
            <PostCards
              key={post.key}
              datePosted={post.datePosted}
              excerpt={post.excerpt}
              image={post.imageFile}
              title={post.title}
              slug={post.slug}
              content={post.content}
            />
          );
        })}
      </div>
    </div>
  )
}
