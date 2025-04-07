import { promptsData } from "../src/data/prompts";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function migrateData() {
  // Connect to MongoDB
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const database = client.db("prompt_library");
    const collection = database.collection("prompts");
    
    // Clear existing data (optional)
    await collection.deleteMany({});
    console.log("Cleared existing data");
    
    // Insert all prompts
    const result = await collection.insertMany(promptsData);
    
    console.log(`${result.insertedCount} prompts successfully migrated to MongoDB`);
    
    // Create indexes
    await collection.createIndex({ teamName: 1 });
    await collection.createIndex({ id: 1 }, { unique: true });
    console.log("Created indexes");
  } catch (error) {
    console.error("Error migrating data:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

migrateData().catch(console.error);
