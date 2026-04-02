import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  // Link to the service being booked
  service: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: true 
  },
  // Customer Details
  customerName: { 
    type: String, 
    required: [true, 'Customer name is required'],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'] 
  },
  // Appointment Details
  // Storing as Date is better for sorting/querying
  date: { 
    type: String, // Keeping as string YYYY-MM-DD for now to match your frontend logic
    required: true,
    index: true 
  }, 
  time: { 
    type: String, // Format: HH:mm
    required: true,
    index: true
  }, 
  duration: { 
    type: Number, 
    required: true,
    default: 30 // Minutes
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'confirmed' 
  }
}, { timestamps: true });

// Prevent double bookings at the schema level (Optional but recommended)
bookingSchema.index({ date: 1, time: 1, status: 1 }, { unique: false });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;