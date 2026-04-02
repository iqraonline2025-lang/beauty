import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const router = express.Router();

// Strategy Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // This is where you'd check your DB (MongoDB/Postgres)
    // For now, we pass the profile forward
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
    successRedirect: "http://localhost:3000/dashboard", // Your Frontend URL
    failureRedirect: "/login/failed",
  })
);

// 3. Check Auth Status
router.get("/login/success", (core, res) => {
  if (core.user) {
    res.status(200).json({
      success: true,
      user: core.user,
    });
  } else {
    res.status(401).json({ success: false });
  }
});

// 4. Logout
router.get("/logout", (core, res) => {
  core.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.redirect("http://localhost:3000/");
  });
});

export default router;