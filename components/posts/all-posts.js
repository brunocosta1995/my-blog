import classes from './all-posts.module.css';
import PostGrid from './post-grid';

export default function AllPosts(props) {
    return (
        <section className={classes.posts}>
            <h1>All Posts</h1>
            <PostGrid posts={props.posts}/>
        </section>
    )
}