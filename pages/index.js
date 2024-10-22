import Head from "next/head";
import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-util";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Bruno's Blog</title>
        <meta
          name="description"
          content="Blog with posts about web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export async function getStaticProps() {
  const posts = getFeaturedPosts();

  return {
    props: {
      posts: posts,
    },
  };
}
