import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const router = express.Router();

// Strategy Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // FIX 1: Provide the full absolute URL or ensure proxy is true
    callbackURL: process.env.NODE_ENV === "production" 
        ? "https://beauty-qyr9.onrender.com/api/auth/google/callback" 
        : "http://localhost:5000/api/auth/google/callback",
    proxy: true // FIX 2: THIS IS REQUIRED FOR RENDER (HOURS OF HEADACHES SAVED)
  },
  (accessToken, refreshToken, profile, done) => {
    // Note: Usually you save profile.id and profile.emails[0].value to MongoDB here
    return done(null, profile);
  }
));

// 1. Trigger Google Login
router.get("/google", passport.authenticate("google", { 
  scope: ["profile", "email"] 
}));

// 2. Callback from Google
router.get("/google/callback", 
  passport.authenticate("google", {
    // FIX 3: Dynamic Redirects
    successRedirect: process.env.NODE_ENV === "production" 
        ? "https://beauty-1-ab1g.onrender.com/dashboard" 
        : "http://localhost:3000/dashboard",
    failureRedirect: "/api/auth/login/failed",
  })
);

// 3. Check Auth Status (Changed 'core' to 'req' for standard practice)
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } else {
    res.status(401).json({ success: false, message: "Not Authenticated" });
  }
});

// 4. Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    const clientUrl = process.env.NODE_ENV === "production" 
        ? "https://beauty-1-ab1g.onrender.com/" 
        : "http://localhost:3000/";
    res.redirect(clientUrl);
  });
});

export default router;
