import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import productsRouter from "./routes/products.js";
import { connectDB } from "./utils/DB.js";

// Connect to Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
