import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://DocgenAI:Docgen@docgenai.u6rqqfx.mongodb.net/")
  .then(async () => {
    console.log("Connected to MongoDB.");
    try {
      await mongoose.connection.collection("users").dropIndex("Email_1");
      console.log("Successfully dropped stale index: Email_1");
    } catch (e) {
      console.log("Error dropping index (it might not exist):", e.message);
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
