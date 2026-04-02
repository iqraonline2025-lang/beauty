import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/authController.js";

// Load env variables specifically for this module to prevent "undefined" crashes
dotenv.config();

const router = express.Router();

// --- DEBUGGING LOGS (Check your terminal for these!) ---
console.log("--- Auth Route Initializing ---");
if (!process.env.GOOGLE_CLIENT_ID) {
    console.error("❌ ERROR: GOOGLE_CLIENT_ID is missing from .env file!");
} else {
    console.log("✅ GOOGLE_CLIENT_ID loaded successfully.");
}

// --- PASSPORT CONFIGURATION ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // Absolute URL is more reliable for Google's matching logic
    callbackURL: "http://localhost:5000/api/auth/google/callback" 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// --- AUTH ROUTES ---

// 1. Email/Password
router.post("/register", registerUser);
router.post("/login", loginUser);

// 2. Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", 
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/services");
  }
);

// 3. Status Check (Returns 200 for guests to keep console clean)
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        isAdmin: req.user.isAdmin
      },
    });
  } else {
    res.status(200).json({ success: false, message: "No active session" });
  }
});

// 4. Logout (POST method to match frontend Axios call)
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid'); 
        res.status(200).json({ success: true });
      });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

export default router;