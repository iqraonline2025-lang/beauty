import express from 'express';
import { 
    createBooking, 
    getOccupiedSlots, 
    cancelBooking, 
    getAllBookings 
} from '../controllers/bookingController.js';

const router = express.Router();

// Public Routes
router.get('/occupied', getOccupiedSlots);
router.post('/', createBooking);

// Admin Routes
router.get('/all', getAllBookings);

// --- FIXED LINE ---
// Changed from .patch('/:id/cancel') to .put('/:id') 
// to match: fetch(`${API}/api/bookings/${id}`, { method: 'PUT' })
router.put('/:id', cancelBooking);

export default router;
