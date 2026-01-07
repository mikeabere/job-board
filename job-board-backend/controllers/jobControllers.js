
const Job = require("./models/JobModel.js");
//const {authenticate} = require("./middleware/authMiddleware.js"); //should be put in routes

// Get all jobs with search and filters
export const jobController = {
  getAllJobs: async (req, res) => {
  try {
    const { search, location, type, category, sort } = req.query;
    let query = { status: 'active' };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Location filter
    if (location) {
      query.location = new RegExp(location, 'i');
    }

    // Type filter
    if (type) {
      query.type = type;
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    let jobsQuery = Job.find(query);

    // Sorting
    if (sort === 'newest') {
      jobsQuery = jobsQuery.sort({ createdAt: -1 });
    } else if (sort === 'oldest') {
      jobsQuery = jobsQuery.sort({ createdAt: 1 });
    }

    const jobs = await jobsQuery.populate('employerId', 'name company');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},

// Get single job
   getJobById: async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employerId', 'name company email phone');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},

// Create job (employer only)
     createjob: async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can post jobs' });
    }

    const { title, company, location, type, category, salary, description, requirements } = req.body;

    const job = new Job({
      title,
      company,
      location,
      type,
      category,
      salary,
      description,
      requirements,
      employerId: req.user.userId
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},

// Update job
      updateJob: async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.employerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
},

// Delete job
        deleteJob: async (req, res) => {
          try {
           const job = await Job.findById(req.params.id);
    
          if (!job) {
           return res.status(404).json({ message: 'Job not found' });
           }

          if (job.employerId.toString() !== req.user.userId) {
          return res.status(403).json({ message: 'Not authorized' });
         }

          await job.deleteOne();
          res.json({ message: 'Job deleted' });
          } catch (error) {
           res.status(500).json({ message: 'Server error', error: error.message });
           }
          },

// Get employer's jobs
        getEmployersJob: async (req, res) => {
         try {
          if (req.user.role !== 'employer') {
          return res.status(403).json({ message: 'Not authorized' });
          }

          const jobs = await Job.find({ employerId: req.user.userId }).sort({ createdAt: -1 });
          res.json(jobs);
        } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    },
  };
