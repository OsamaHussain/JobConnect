const express = require("express");
const authController = require("../controller/PostJobController");
// const { verifyToken } = require('../utils/jwt');
const router = express.Router();
const upload = require("../utils/multerStorage");

router.post("/CreatePost", upload.single("postImg"), authController.CreateJob);
router.post("/GetPosts", authController.GetJobs);
router.post("/GetPost/:userId", authController.GetJobsOfUser);
router.post("/DeletePost", authController.DeleteJob);
router.post("/EditPost", authController.EditJob);

module.exports = router;
