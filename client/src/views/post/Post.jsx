import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import jwtDecode from "jwt-decode";

function Post() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [experience, setExperience] = useState("");
  const [file, setFile] = useState();
  const [description, setDescription] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    } else {
      setHidden(false);
    }
    setUserInfo(jwtDecode(token));
  }, [loggedIn]);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("jobTitle", jobTitle);
    formData.append("salary", salary);
    formData.append("location", location);
    formData.append("jobtype", jobtype);
    formData.append("experience", experience);
    formData.append("postImg", file);
    formData.append("userId", userInfo._id);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/post/CreatePost",
        formData
      );
      alert("Job Successfully Posted");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={hidden ? "hidden" : "visible"}>
      <NavigationBar />
      <div className="login-container" style={{ marginTop: "20px" }}>
        {/* <h2>Create Post</h2> */}
        <div style={{ display: "flex", gap: 12 }}>
          <div className="login-form">
            <input
              name="jobTitle"
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <br />
            <input
              name="salary"
              type="text"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <br />
            <input
              name="location"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <br />
            <input
              name="jobtype"
              type="text"
              placeholder="Job Type"
              value={jobtype}
              onChange={(e) => setJobtype(e.target.value)}
            />
            <br />
            <input
              name="experience"
              type="text"
              placeholder="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <br />
            <input
              name="postImg"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button onClick={handlePost}>Post</button>
          </div>
          <div className="login-form">
            <textarea
              name="description"
              type="text"
              placeholder="Write something about job"
              value={description}
              style={{width:'100%', height:'100%', borderRadius:'10px', borderColor:'#ccc', resize:'none', padding:20}}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
