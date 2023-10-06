import React, { useEffect, useRef, useState } from "react";
import "./NavigationBar.css";
import * as Icon from "react-feather";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const decodedToken = jwtDecode(token);
      setName(decodedToken.name);
      console.log(name);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container">
      <div className="innerContainer">
        <h2>JobConnect</h2>
      </div>
      <div className="innerContainer">
        <div
          className="itemContainer"
          onClick={() => {
            navigate("/");
          }}
        >
          <Icon.Home color="#0056b3" size={25} />
          <p>Home</p>
        </div>
        <div
          className="itemContainer"
          onClick={() => {
            navigate("/post");
          }}
        >
          <Icon.PlusSquare color="#0056b3" size={25} />
          <p>Create</p>
        </div>
        <div
          className="itemContainer"
          onClick={() => {
            navigate("/myJobs");
          }}
        >
          <Icon.Briefcase color="#0056b3" size={25} />
          <p>Jobs</p>
        </div>
        <div className="itemContainer">
          <Icon.MessageSquare color="#0056b3" size={25} />
          <p>Chat</p>
        </div>
        <div className="itemContainer">
          <Icon.Bell color="#0056b3" size={25} />
          <p>Alerts</p>
        </div>
        <div className="itemContainer" onClick={toggleDropdown}>
          <div className="dropdown">
            <img
              src="https://ru-static.z-dn.net/files/d96/ced913ba9fe71679ae395a4be5fac683.jpg"
              alt="profile"
              width={35}
            />
            <p>Profile</p>
            <ul className={`dropdown-list ${isDropdownOpen ? "open" : ""}`}>
              <div className="section1--profile--container">
                <div className="section1--profile">
                  <img
                    src="https://ru-static.z-dn.net/files/d96/ced913ba9fe71679ae395a4be5fac683.jpg"
                    alt="profile-img"
                    width={55}
                  />
                  <div>
                    <h2>{name || 'User'}</h2>
                    <p>Student at FUUAST University</p>
                  </div>
                </div>
                <button className="section1--profile--btn">View Profile</button>
              </div>
              <hr style={{ border: "0", borderTop: "1px solid #f0f0f0" }} />
              <div>
                <div className="section2--profile">
                  <h2>Account</h2>
                  <p>Setting & Privacy</p>
                  <p>Help</p>
                  <p>Language</p>
                </div>
              </div>
              <hr style={{ border: "0", borderTop: "1px solid #f0f0f0" }} />
              <div>
                <div className="section2--profile">
                  <h2>Manage</h2>
                  <p>Post & Activity</p>
                  <p>Job Posting Account</p>
                </div>
              </div>
              <hr style={{ border: "0", borderTop: "1px solid #f0f0f0" }} />
              <div>
                <div
                  className="section2--profile signout"
                  onClick={handleLogout}
                >
                  <p>Sign Out</p>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
