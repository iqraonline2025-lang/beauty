import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";

// Route Imports
import serviceRoutes from "./routes/serviceRoutes.js"; 
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- TRUST PROXY (For Render) ---
app.set("trust proxy", 1); 

// --- DYNAMIC CORS ---
const FRONTEND_URL = process.env.NODE_ENV === "production" 
    ? "https://beauty-1-ab1g.onrender.com" 
    : "http://localhost:3000";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true 
}));

// --- SESSION CONFIG (Memory Store) ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "zainab_studio_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// REGISTER ROUTES
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running... 🚀" });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
