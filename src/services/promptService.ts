import { mongoClient } from "@/integrations/mongodb/client";
import { Prompt } from "@/types";

export const PromptService = {
  async getAllPrompts(): Promise<Prompt[]> {
    await mongoClient.connect();
    const db = mongoClient.getDb();
    const collection = db.collection<Prompt>("prompts");
    
    return collection.find({}).toArray();
  },
  
  async getPromptById(id: number): Promise<Prompt | null> {
    await mongoClient.connect();
    const db = mongoClient.getDb();
    const collection = db.collection<Prompt>("prompts");
    
    return collection.findOne({ id });
  },
  
  async getPromptsByTeam(teamName: string): Promise<Prompt[]> {
    await mongoClient.connect();
    const db = mongoClient.getDb();
    const collection = db.collection<Prompt>("prompts");
    
    return collection.find({ teamName }).toArray();
  },
  
  async addPrompt(prompt: Omit<Prompt, "id">): Promise<Prompt> {
    await mongoClient.connect();
    const db = mongoClient.getDb();
    const collection = db.collection<Prompt>("prompts");
    
    // Find highest ID
    const highestPrompt = await collection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = highestPrompt.length > 0 ? highestPrompt[0].id + 1 : 1;
    
    const newPrompt = { ...prompt, id: newId };
    await collection.insertOne(newPrompt);
    
    return newPrompt;
  }
};
