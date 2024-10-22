import Head from "next/head";
import ContactForm from "@/components/contact/contact-form";

export default function ContactsPage() {
  return (
    <>
    <Head>
      <title>Contact Me</title>
      <meta name="description" content="Send me yout message"/>
    </Head>
      <ContactForm />
    </>
  );
}
