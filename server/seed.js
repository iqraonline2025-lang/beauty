import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // This line clears the dummy data
    await Service.deleteMany();
    console.log("Database cleared! 🧼 (No dummy data left)");
    
    // Logic to insert only if you explicitly want to test:
    // await Service.insertMany(services); 

    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

seedDatabase();