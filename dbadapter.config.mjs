import { MongoClient } from "mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

if (!import.meta.env.MONGODB_URI)
    throw new Error("Missing MONGODB_URI in .env");

const uri = import.meta.env.MONGODB_URI;
const options = {};

let client;

/**
 * @type {Promise<MongoClient>}
 */
let clientPromise;

client = new MongoClient(uri, options);
clientPromise = client.connect();

const dba = new MongoDBAdapter(clientPromise);

export default dba;
