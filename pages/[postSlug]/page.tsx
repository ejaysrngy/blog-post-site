import React from 'react'

export default function SinglePostPage({params} : {params: {postSlug: string}}) {
  return (
    <div>{params.postSlug}</div>
  )
}
