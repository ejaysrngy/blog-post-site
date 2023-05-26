import React from 'react'

import { useRouter } from 'next/router'

export default function SinglePostPage() {
  const router = useRouter()

  const {postSlug} = router.query

  return (
    <div>{postSlug}</div>
  )
}
