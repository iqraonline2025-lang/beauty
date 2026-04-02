import express from 'express';
import Service from '../models/Service.js'; 
import upload from '../middleware/UploadMiddleware.js';
import { 
  getServices, 
  getAllServices, 
  createService, 
  deleteService 
} from '../controllers/serviceController.js';

const router = express.Router();

// 1. GET Featured Services (For Home Page)
router.get('/', getServices);

// 2. GET All Services (For Main Menu)
router.get('/all', getAllServices);

// 3. GET Specific Service by ID (The "Missing Link")
// This is critical for the booking page to know what service is being selected
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID format or server error" });
    }
});

// 4. POST New Service (Includes File Upload)
router.post('/', upload.single('image'), createService);

// 5. DELETE Specific Service
router.delete('/:id', deleteService);

// 6. THE DATABASE CLEANER (Dev use only)
router.get('/nuke/everything', async (req, res) => {
  try {
    const result = await Service.deleteMany({});
    res.status(200).send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #fff5f7; min-height: 100vh;">
        <h1 style="color: #db2777; font-size: 3rem;">Database wiped clean! 🧼</h1>
        <p style="color: #4b5563; font-size: 1.2rem;">Removed <strong>${result.deletedCount}</strong> items.</p>
        <p style="color: #9ca3af;">Go to the <a href="http://localhost:3000/admin" style="color: #db2777; font-weight: bold;">Admin Page</a> to add new ones.</p>
      </div>
    `);
  } catch (error) {
    res.status(500).json({ message: "Error clearing database", error: error.message });
  }
});

export default router;