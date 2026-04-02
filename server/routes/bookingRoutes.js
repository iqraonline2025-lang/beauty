import express from 'express';
import { 
    createBooking, 
    getOccupiedSlots, 
    cancelBooking, 
    getAllBookings 
} from '../controllers/bookingController.js';

const router = express.Router();

// Admin Routes
router.get('/all', getAllBookings);
router.patch('/:id/cancel', cancelBooking);

// Public Routes
router.get('/occupied', getOccupiedSlots);
router.post('/', createBooking);

export default router;