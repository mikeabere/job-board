const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
  category: { type: String, required: true },
  salary: { type: String },
  description: { type: String, required: true },
  requirements: [String],
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

// Text index for search optimization
jobSchema.index({ title: 'text', description: 'text', company: 'text' });

export default  Job = mongoose.model('Job', jobSchema);