import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid request" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    //adaptado para o deployment retirando as dependencias do processo de teste.
    const databaseConnection = `mongodb+srv://${process.env.mongodb_username}:${process.env.mondodb_password}@${process.env.mongodb_clustername}.4jrso.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`;

    try {
      client = await MongoClient.connect(databaseConnection);

    } catch (error) {
        res.status(500).json({message: 'Could not connect to the database'});
        return;
    }

    const db = client.db();

    try {
        const result = await db.collection('messages').insertOne(newMessage);
        newMessage.id = result.insertedId;        
    } catch (error) {
        client.close();
        res.status(500).json({message: 'Storing message failed'});
        return;
    }
    client.close();
    res
      .status(201)
      .json({ message: "Sucessfully stored message", message: newMessage });
  }
}
