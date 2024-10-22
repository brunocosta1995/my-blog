import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "posts");

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ''); //remove a extensão do nome do arquivo.
  const pathFile = path.join(postDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(pathFile, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getPostDirectory() {
  return fs.readdirSync(postDirectory);
}

export function getAllPosts() {
  const postFiles = getPostDirectory();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) => {
    return postA.date > postB ? -1 : 1;
  });

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter(
    (postItem) => postItem.isFeatured === true
  );

  return featuredPosts;
}
