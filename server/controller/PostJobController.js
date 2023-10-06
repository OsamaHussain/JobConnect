const post = require("../model/PostJob");

const authController = {
  async CreateJob(req, res) {
    try {
      const postImg = req.file;
      const { jobTitle, salary, location, jobtype, experience, userId } =
        req.body;

      if (!jobTitle || !salary || !location || !jobtype || !experience) {
        return res.status(400).json({ message: "all fields required" });
      }

      //create Job
      const newUser = new post({
        jobTitle,
        salary,
        location,
        jobtype,
        experience,
        postImg: `http://localhost:5000/upload/${postImg.filename}`,
        userId,
      });
      await newUser.save();

      // const token = jwt.sign(req.body)
      res.json({ newUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
  async GetJobs(req, res) {
    try {
      // Getting All Jobs From DB
      const jobs = await post.find().sort({
        _id: -1,
        jobTitle: -1,
        salary: -1,
        location: -1,
        jobtype: -1,
        experience: -1,
        postImg: -1,
        userId: -1,
      });
      return res.status(200).json(jobs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
  async GetJobsOfUser(req, res) {
    try {
      // Getting User Posted All Jobs From DB
      const { userId } = req.params;
      console.log(userId);
      const jobs = await post.find({ userId }).sort({
        _id: -1,
        jobTitle: -1,
        salary: -1,
        location: -1,
        jobtype: -1,
        experience: -1,
        postImg: -1,
        userId: -1,
      });
      return res.status(200).json(jobs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
  async DeleteJob(req, res) {
    const { id } = req.body;
    try {
      const job = await post.deleteOne({ _id: id });
      return res.status(200).json(job);
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
  async EditJob(req, res) {
    const { id, jobTitle, salary, location, jobtype, experience } = req.body;
    try {
      const job = await post.updateOne(
        { _id: id },
        {
          jobTitle,
          salary,
          location,
          jobtype,
          experience,
        }
      );
      return res.status(200).json(job);
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },
};

module.exports = authController;
