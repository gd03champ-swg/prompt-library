import { MongoClient } from "mongodb";

async function testMongo() {
  // Connect to MongoDB
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB");
    
    const database = client.db("test");
    console.log("Database accessed:", database.databaseName);
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

testMongo().catch(console.error);
