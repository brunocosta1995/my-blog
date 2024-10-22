import classes from "./contact-form.module.css";
import { useState, useEffect } from "react";
import Notification from "../ui/notification";

async function inputMessageHandler(bodyMessage) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(bodyMessage),
    headers: { "Content-Type": "application/json" },
  });
  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error on submiting the message");
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (
      requestStatus ||
      requestStatus === "success" ||
      requestStatus === "error"
    ) {
      const timer = setTimeout(() => {
        setRequestError(null);
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function messageHandler(event) {
    event.preventDefault();
    setRequestStatus("pending");

    try {
      await inputMessageHandler({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredEmail('');
      setEnteredMessage('');
      setEnteredName('');
    } catch (error) {
      setRequestStatus("error");
      setRequestError(error.message);
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      title: "Sending message...",
      message: "Your message is been sending",
      status: "pending",
    };
  }
  if (requestStatus === "success") {
    notification = {
      title: "Message sended!",
      message: "Message sent sucessfully",
      status: "success",
    };
  }

  if (requestStatus === "error") {
    notification = {
      title: "Error on sending the message!",
      message: requestError,
      status: "error",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={messageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.controls}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  );
}
