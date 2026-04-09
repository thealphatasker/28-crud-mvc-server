import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

console.log("Attempting to connect to:", uri);

mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Full Error Details:");
    console.error(JSON.stringify(err, null, 2));
    console.error("Error Message:", err.message);
    process.exit(1);
  });
