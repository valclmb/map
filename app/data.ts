import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    return client;
  } catch (error) {
    console.log("Erreur de connexion à la base de données:", error);
    throw error; // Relance l'erreur pour la gérer ailleurs si nécessaire
  }
};

export const getMap = async () => {
  let client;
  try {
    client = await connectToDatabase();
    const db = client.db("map-quiz");
    const collection = db.collection("map");

    const data = await collection.findOne();

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log("Erreur lors de la récupération des données:", error);
    throw error; // Relance l'erreur pour la gérer ailleurs si nécessaire
  } finally {
    if (client) {
      client.close();
    }
  }
};
