const fs = require("fs");

const generateJobPost = (id) => ({
  jobTitle: [
    "Software Engineer",
    "Data Analyst",
    "UX/UI Designer",
    "Marketing Manager",
    "Frontend Developer",
    "Sales Representative",
    "Project Manager",
    "Content Writer",
    "Network Engineer",
    "HR Coordinator",
    "Product Manager",
    "Graphic Designer",
    "Financial Analyst",
    "Customer Support Specialist",
    "Business Development Manager",
    "Quality Assurance Engineer",
    "Operations Manager",
    "Digital Marketing Specialist",
    "Software Architect",
    "Data Scientist",
  ][Math.floor(Math.random() * 20)],
  salary: `$${Math.floor(Math.random() * 90000) + 30000}`,
  location: [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Gujranwala",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "New York",
    "Los Angeles",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
    "Dubai",
    "Singapore",
    "Toronto",
    "Miami"
  ][
    Math.floor(Math.random() * 20)
  ],
  jobtype: ["Full-time", "Part-time", "Contract", "Remote"][
    Math.floor(Math.random() * 4)
  ],
  experience: `${Math.floor(Math.random() * 10)}+ years`,
});

const generateBulkData = (count) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push(generateJobPost(i));
  }
  return data;
};

const bulkData = generateBulkData(99); // Generate 100 job posts

fs.writeFileSync("jobPosts.json", JSON.stringify(bulkData, null, 2));
console.log("Bulk data generated and saved to jobPosts.json");
