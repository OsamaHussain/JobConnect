import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./Home.css";
import * as Icon from "react-feather";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    } else {
      setHidden(false);
    }

    (async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/post/GetPosts");
        setData(res.data);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [loggedIn]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/post/DeletePost",
        {
          id,
        }
      );
      setData(data.filter((data) => data._id !== id));
      alert("Post Deleted Successfully");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleEdit = async (item) => {
    try {
      const updatedJobTitle = document.querySelector(
        `li[data-id="${item._id}-jobTitle"]`
      ).textContent;
      const updatedSalary = document.querySelector(
        `li[data-id="${item._id}-salary"]`
      ).textContent;
      const updatedLocation = document.querySelector(
        `li[data-id="${item._id}-location"]`
      ).textContent;
      const updatedJobType = document.querySelector(
        `li[data-id="${item._id}-jobtype"]`
      ).textContent;
      const updatedExperience = document.querySelector(
        `li[data-id="${item._id}-experience"]`
      ).textContent;

      const res = await axios.post("http://localhost:5000/api/post/EditPost", {
        id: item._id,
        jobTitle: updatedJobTitle,
        salary: updatedSalary,
        location: updatedLocation,
        jobtype: updatedJobType,
        experience: updatedExperience,
      });
      alert("Post Edited Successfully");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={hidden ? "hidden" : "visible"}>
      <NavigationBar />
      <div className="home--container">
        {data.map((item, index) => (
          <div className="border home--inner--container" key={index}>
            <li
              className="editable jobTitle"
              style={{ boxShadow: "0 3px 5px 0px #000" }}
              contenteditable="true"
              data-id={`${item._id}-jobTitle`}
              onInput={(e) => {
                if (e.target.textContent.length > 20) {
                  e.target.textContent = e.target.textContent.slice(0, 20);
                  const range = document.createRange();
                  const sel = window.getSelection();
                  range.selectNodeContents(e.target);
                  range.collapse(false);
                  sel.removeAllRanges();
                  sel.addRange(range);
                }
              }}
            >
              {/* {item.jobTitle.slice(0, 20)} */}
            </li>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                margin: "15px 35px -20px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 0 5px #000",
                }}
              >
                <img
                  src={
                    !item.postImg == ""
                      ? item.postImg
                      : "http://localhost:5000/upload/dummy.jpg"
                  }
                  alt="IMG"
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, padding: 0 }}>{item.jobTitle}</h4>
                <p>
                  <span style={{ display: "block" }}>Author: Osama</span>
                  <span style={{ display: "block" }}>Status: Verified</span>
                </p>
              </div>
            </div>
            <div className="card--outer--container">
              <div className="card--inner--container">
                <Icon.TrendingUp />
                <li
                  className="editable"
                  contenteditable="false"
                  data-id={`${item._id}-salary`}
                >
                  {item.salary}
                </li>
              </div>
              <div className="card--inner--container">
                <Icon.Globe />
                <li
                  className="editable"
                  contenteditable="false"
                  data-id={`${item._id}-location`}
                >
                  {item.location}
                </li>
              </div>
              <div className="card--inner--container">
                <Icon.Server />
                <li
                  className="editable"
                  contenteditable="false"
                  data-id={`${item._id}-jobtype`}
                >
                  {item.jobtype}
                </li>
              </div>
              <div className="card--inner--container">
                <Icon.Award />
                <li
                  className="editable"
                  contenteditable="false"
                  data-id={`${item._id}-experience`}
                >
                  {item.experience}
                </li>
              </div>
            </div>

            {/* View Button */}
            <div className="d-flex">
              <button className="blue" style={{backgroundColor:'#603F83FF'}} onClick={()=>{
                handleView(item);
              }}>View</button>
            </div>

            {/* Edit and Delete Button */}
            {false && (
              <div className="d-flex">
                <button
                  className="blue"
                  onClick={() => {
                    handleEdit(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className="red"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
