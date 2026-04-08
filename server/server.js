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

// --- 1. TRUST PROXY ---
// Required for Render and mobile browsers to handle "secure" cookies correctly.
app.set("trust proxy", 1); 

// --- 2. DYNAMIC CORS ---
const FRONTEND_URL = process.env.NODE_ENV === "production" 
    ? "https://beauty-1-ab1g.onrender.com" 
    : "http://localhost:3000";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true 
}));

// --- 3. SESSION CONFIG (Fixed for Android/Mobile) ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "zainab_studio_secret",
    resave: false,
    saveUninitialized: false,
    proxy: true, // Crucial for Render deployment
    cookie: {
      // Must be true for HTTPS. Android Chrome rejects cookies if this is false on HTTPS.
      secure: process.env.NODE_ENV === "production", 
      // 'none' is required because frontend and backend have different URLs.
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      httpOnly: true, // Security best practice
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// --- 4. PASSPORT INIT ---
app.use(passport.initialize());
app.use(passport.session());

// --- 5. MIDDLEWARE ---
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// --- 6. REGISTER ROUTES ---
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running... 🚀" });
});

// --- 7. ERROR HANDLING ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// --- 8. DATABASE & SERVER START ---
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    
    // Listening on '0.0.0.0' is the "missing link" for Cloudflare and Render to talk.
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
