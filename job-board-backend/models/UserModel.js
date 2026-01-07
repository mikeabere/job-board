const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employer', 'applicant'], required: true },
  company: { type: String }, // For employers
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default  User = mongoose.model('User', userSchema);