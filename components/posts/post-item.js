import Link from "next/link";
import Image from "next/image";
import classes from "./post-item.module.css";

export default function PostItem(props) {
  const { title, image, excerpt, date, slug } = props.post;
  const formattedTime = new Date(date).toLocaleDateString("us-EN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: 'UTC'
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
            layout="responsive"
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedTime}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
