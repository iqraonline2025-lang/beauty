import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  category: {
    type: String, 
    required: true,
    enum: ['Hair', 'Lashes', 'Brows', 'Skin'] 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: {
    type: Number, 
    required: true 
  },
  duration: {
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  }
}, { 
  timestamps: true 
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;