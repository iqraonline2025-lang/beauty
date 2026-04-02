import User from "../models/User.js";
import bcrypt from "bcryptjs"; 

// @desc    Register new user
// Make sure "export" is right here!
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ 
      user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// Make sure "export" is right here and the name matches "loginUser"
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Using Passport's req.login to establish the session
    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      res.json({ 
        user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } 
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};