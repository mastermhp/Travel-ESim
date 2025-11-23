// MongoDB connection utility
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env file")
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

// Get database instance
export async function getDb() {
  const client = await clientPromise
  return client.db(process.env.MONGODB_DB_NAME || "travel_esim")
}

// Collections helper
export async function getCollection(collectionName) {
  const db = await getDb()
  return db.collection(collectionName)
}
