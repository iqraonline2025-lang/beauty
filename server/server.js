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

// --- FIX 1: TRUST PROXY ---
// Render uses a proxy. Without this, 'secure: true' cookies won't be sent.
app.set("trust proxy", 1); 

// --- FIX 2: SESSION CONFIG ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "zainab_studio_secret",
    resave: false,
    saveUninitialized: false,
    proxy: true, // Required for Render
    cookie: {
      // Must be true for HTTPS on Render
      secure: process.env.NODE_ENV === "production", 
      // CRITICAL: Required for cross-site cookies between frontend and backend URLs
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// 2. PASSPORT INIT
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: "https://beauty-1-ab1g.onrender.com",
  credentials: true // Required to allow cookies to be sent back and forth
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// REGISTER ROUTES
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running smoothly... 🚀" });
});

// Error Handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
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
