// server/server.js

// 1. ENVIRONMENT CONFIG (Beat ESM hoisting using createRequire)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config(); 

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

// 2. RENDER/PROXY SETTINGS
// This is critical for Google OAuth. It tells Express to trust Render's 
// headers so the redirect happens over HTTPS instead of HTTP.
app.set("trust proxy", 1); 

// 3. SESSION CONFIG
app.use(
  session({
    secret: process.env.SESSION_SECRET || "zainab_studio_secret",
    resave: false,
    saveUninitialized: false,
    proxy: true, // Required for secure cookies on proxy hosts like Render
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      maxAge: 24 * 60 * 60 * 1000,
      // 'none' is required for cross-site cookies during OAuth redirects
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// 4. PASSPORT INIT
app.use(passport.initialize());
app.use(passport.session());

// 5. CORS CONFIG
app.use(cors({
  origin: [
    "https://beauty-1-ab1g.onrender.com", 
    "http://localhost:3000"
  ],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// 6. REGISTER ROUTES
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running smoothly... 🚀" });
});

// 7. ERROR HANDLING
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// 8. DATABASE & SERVER START
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in .env");
  process.exit(1);
}

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
