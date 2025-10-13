import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { connectDB } from './config/db.js';
import admin from "./routes/adminRoute.js";
import bodyParser from 'body-parser';
import blog from "./routes/blogRoute.js"

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
})); // ✅ call it as a function
app.use(express.json());

// Routes
app.use("/api/admin", admin);
app.use("/api/blog", blog);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
