const express = require("express");
const router = express.Router();
//const {authenticate} = require("./middleware/authMiddleware.js"); // should be put in routes
//const {upload} = require("./middleware/multerfileUpload..js");

const {applyForJob, getApplicantsApplication, getApplications, updateApplicationStatus, } = require("./controllers/applicationController.js");


router.post("applications", applyForJob);
router.get("applications/:id", getApplicantsApplication);
router.get("applications", getApplications);
router.patch("applications/:id", updateApplicationStatus);

module.exports = router;