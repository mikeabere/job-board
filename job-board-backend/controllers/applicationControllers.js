
const Application = require("./models/ApplicationModel.js");
const Job = require("./models/JobModel.js");
// const {authenticate} = require("./middleware/authMiddleware.js"); // should be put in routes
// const {upload} = require("./middleware/multerfileUpload..js");

// Apply for job
export const applicationControllers = {
    applyForJob:  async (req, res) => {
  try {
    if (req.user.role !== 'applicant') {
      return res.status(403).json({ message: 'Only applicants can apply' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    const { jobId, coverLetter } = req.body;

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId,
      applicantId: req.user.userId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      jobId,
      applicantId: req.user.userId,
      resume: req.file.filename,
      coverLetter
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},

// Get applicant's applications
       getApplicantsApplication: async (req, res) => {
  try {
    if (req.user.role !== 'applicant') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ applicantId: req.user.userId })
      .populate('jobId')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},

// Get applications for a job (employer only)
    getApplications: async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job || job.employerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('applicantId', 'name email phone')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},

// Update application status
    updateApplicationStatus: async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate('jobId');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.jobId.employerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = status;
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},
};