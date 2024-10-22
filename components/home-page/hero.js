import classes from "./hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/FT1.jpeg"
          alt="a photo with Bruno"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi I'm Bruno</h1>
      <p>I'm web developer evolving and learnign React and Next-JS</p>
    </section>
  );
}
