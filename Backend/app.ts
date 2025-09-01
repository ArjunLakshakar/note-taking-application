import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import session from "express-session";
import passport from "passport";


dotenv.config();

const app: Application = express(); // ✅ Proper type
import "./config/passport.js";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret", 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, 
  })
);

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/notesapp")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("Notes API running");
});

app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

export default app;
