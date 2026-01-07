const express = require("express");
const router = express.Router();
//const {authenticate} = require("./middleware/authMiddleware.js"); //should be put in routes
const {getAllJobs, getJobById, createjob, updateJob, deleteJob, getEmployersJob} = require("./controllers/jobController.js");


router.get("jobs", getAllJobs );
router.get("jobs/:id", getJobById );
router.post("jobs", createjob );
router.patch("jobs/:id", updateJob );
router.delete("jobs/:id", deleteJob );
router.delete("jobs", getEmployersJob );

module.exports = router;