import React from "react";

import { useRouter } from "next/router";
import { SinglePostComponent } from "@/components";

export default function SinglePostPage() {
  const router = useRouter();

  const { postSlug } = router.query;

  const DUMMY_DATA = {
    datePosted: "05/25/2023",
    excerpt: "# Test desciprtionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    image:
      "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png/revision/latest?cb=20210827150137",
    key: 1,
    title: "Test Title 1 Test Title 1 Test Title 1 Test Title 1 Test Title 1",
    slug: "test-title-1",
    content: '# This is the content'
  };

  return (
    <SinglePostComponent postDetails={DUMMY_DATA} />
  );
}
