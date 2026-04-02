import Service from '../models/Service.js';

// @desc    Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get limited services for Home Page
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 }).limit(3);
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new service
export const createService = async (req, res) => {
  try {
    // Check if Multer actually picked up the file
    if (!req.file) {
      return res.status(400).json({ message: "Image file is missing" });
    }

    // Extracting data safely from req.body
    const { title, category, description, price, duration, slug } = req.body;

    // Build the object manually to ensure nothing is 'undefined'
    const newService = new Service({
      title: title || "Untitled",
      category: category || "General",
      description: description || "",
      price: Number(price) || 0, // Forces string to number
      duration: duration || "N/A",
      slug: slug || Date.now().toString(), // Fallback slug to prevent crash
      image: `/uploads/${req.file.filename}`
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);

  } catch (error) {
    // This logs the EXACT reason for the 500 error in your terminal
    console.error("SERVER ERROR:", error.message);

    if (error.code === 11000) {
      return res.status(400).json({ message: "A service with this title already exists" });
    }

    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// @desc    Delete single service
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};