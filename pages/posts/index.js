import Head from "next/head";
import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";

export default function AllPostsPage(props) {
    return(
      <>
      <Head>
        <title>All Posts Page</title>
        <meta name="description" content="List of all programming-related tutorial and posts"/>
      </Head>
        <AllPosts posts={props.allPosts}/>
        </>
    )
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      allPosts: allPosts
    }
  }
  
}