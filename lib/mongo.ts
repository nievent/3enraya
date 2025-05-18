import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error('Falta la variable MONGODB_URI en .env.local');
}

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
