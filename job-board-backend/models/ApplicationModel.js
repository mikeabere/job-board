const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now }
});

export default  Application = mongoose.model('Application', applicationSchema);