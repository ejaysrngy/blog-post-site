import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "posts");

const getPostData = (fileName?: string | undefined) => {
  let postData;
  if (fileName) {
    const filePath = path.join(postDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const postSlug = fileName.replace(/\.md$/, "");

    postData = {
      content,
      slug: postSlug,
      date: data.date,
      isFeatured: data.isFeatured,
      ...data,
    };
  } else {
    return postData;
  }

  return postData;
};

const getAllPosts = () => {
  const postFiles = fs.readdirSync(postDirectory);

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA?.date > postB?.date ? -1 : 1
  );

  return sortedPosts;
};

const getFeaturedPosts = () => {
  const featuredPosts = getAllPosts().filter((post) => post?.isFeatured);

  return featuredPosts;
};

export { getPostData, getAllPosts, getFeaturedPosts };
