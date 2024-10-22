import Head from "next/head";
import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostDirectory } from "@/lib/posts-util";

export default function PostDetailPage(props) {
  return (
    <>
    <Head>
      <title>{props.post.title}</title>
      <meta name="description" content={props.post.excerpt}/>
    </Head>
      <PostContent post={props.post} />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const postIdentifier = params.slug;

  const postDetail = getPostData(postIdentifier);

  return {
    props: {
      post: postDetail,
    },
  };
}

export async function getStaticPaths() {
  const postsDir = getPostDirectory();

  const slugs = postsDir.map((post) => post.replace(/\.md$/, ""));

  const newPaths = slugs.map((slug) => ({ params: { slug: slug } }));

  return {
    paths: newPaths,
    fallback: false,
  };
}
