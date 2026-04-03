import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";
import { registerUser, loginUser } from "../controllers/authController.js";

dotenv.config();

const router = express.Router();

const BACKEND_URL = process.env.NODE_ENV === "production" 
    ? "https://beauty-qyr9.onrender.com" 
    : "http://localhost:5000";

const FRONTEND_URL = process.env.NODE_ENV === "production" 
    ? "https://beauty-1-ab1g.onrender.com" 
    : "http://localhost:3000";

// --- FIXED PASSPORT CONFIGURATION ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
    proxy: true 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const emailFromGoogle = profile.emails[0].value;

      // 1. Check if user already has this Google ID linked
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // 2. Check if a user exists with this email but no Google ID linked yet
        user = await User.findOne({ email: emailFromGoogle });

        if (user) {
          // 3. Link the Google ID to the existing email account
          user.googleId = profile.id;
          if (!user.avatar) user.avatar = profile.photos[0].value;
          await user.save();
        } else {
          // 4. If no account exists at all, create a new one
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: emailFromGoogle,
            avatar: profile.photos[0].value
          });
        }
      }
      return done(null, user);
    } catch (error) {
      // This catches the E11000 error or any other DB issues
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
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", 
  passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/login` }),
  (req, res) => {
    res.redirect(`${FRONTEND_URL}/services`);
  }
);

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
