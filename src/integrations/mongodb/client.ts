import { MongoClient, ServerApiVersion } from "mongodb";

// Load environment variables
const MONGODB_URI = import.meta.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "prompt_library";

// Singleton pattern for MongoDB client
class MongoDBClient {
  private static instance: MongoDBClient;
  private client: MongoClient;
  private connected = false;

  private constructor() {
    this.client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  public static getInstance(): MongoDBClient {
    if (!MongoDBClient.instance) {
      MongoDBClient.instance = new MongoDBClient();
    }
    return MongoDBClient.instance;
  }

  async connect() {
    if (!this.connected) {
      await this.client.connect();
      this.connected = true;
      console.log("Connected to MongoDB");
    }
    return this.client;
  }

  getDb() {
    return this.client.db(DB_NAME);
  }

  async close() {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
      console.log("MongoDB connection closed");
    }
  }
}

export const mongoClient = MongoDBClient.getInstance();
