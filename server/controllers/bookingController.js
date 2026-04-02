import Booking from '../models/Booking.js';

// 1. ADMIN: Get All Bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('service')
            .sort({ date: -1, time: 1 });
        res.status(200).json(bookings || []);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};

// 2. PUBLIC: Create a New Booking (This was the missing function!)
export const createBooking = async (req, res) => {
    try {
        const { customerName, email, phone, date, time, service, status } = req.body;

        const newBooking = new Booking({
            customerName,
            email,
            phone,
            date,
            time,
            service: service || null, // Allow null for Admin Blocks
            status: status || 'confirmed'
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: "Error creating booking", error: error.message });
    }
};

// 3. PUBLIC: Get Occupied Slots
export const getOccupiedSlots = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ message: "Date is required" });

        const bookings = await Booking.find({ date, status: 'confirmed' });
        const occupiedTimeSlots = bookings.map(b => b.time);
        res.status(200).json(occupiedTimeSlots);
    } catch (error) {
        res.status(500).json({ message: "Error fetching slots", error: error.message });
    }
};

// 4. ADMIN: Update Status (Cancel or Confirm)
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const targetStatus = status || 'cancelled';

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status: targetStatus },
            { new: true }
        ).populate('service');

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.status(200).json({ message: `Booking ${targetStatus}`, booking });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
};