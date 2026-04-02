import Service from '../models/Service.js';

// 1. GET Featured Services (Limit for Home Page)
export const getServices = async (req, res) => {
    try {
        const services = await Service.find().limit(6);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching featured services" });
    }
};

// 2. GET All Services
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching all services" });
    }
};

// 3. CREATE Service (Fixed for Image Upload & 400 Errors)
export const createService = async (req, res) => {
    try {
        const { title, description, price, duration } = req.body;

        // --- VALIDATION LOGIC ---
        // If these are missing, we send a 400 before the DB even tries to save.
        if (!title || !price) {
            return res.status(400).json({ 
                message: "Validation Error: Title and Price are required." 
            });
        }

        // --- IMAGE HANDLING ---
        // 'req.file' comes from the 'upload.single("image")' middleware in the route
        let imagePath = null;
        if (req.file) {
            // We store the path so the frontend can display it
            imagePath = `/uploads/${req.file.filename}`;
        }

        const newService = new Service({
            title,
            description,
            price: Number(price), // Ensure price is a number
            duration,
            image: imagePath
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);

    } catch (error) {
        console.error("Create Service Error:", error);
        // This catches MongoDB validation errors or schema mismatches
        res.status(400).json({ message: error.message });
    }
};

// 4. DELETE Service
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service", error: error.message });
    }
};
