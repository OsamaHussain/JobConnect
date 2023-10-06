import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [field, setField] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      setHidden(false);
    }
  }, [loggedIn]);

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/signup", {
        name,
        email,
        password,
        phone,
        field,
        age,
        experience,
      });
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={hidden ? "hidden" : "visible"}>
      <div className="login-container">
        <h2>Signup</h2>
        <div className="login-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Field"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <br />
          <div className="btnSubmit">
            <button onClick={handleSignup}>Signup</button>
            <a onClick={handleNavigateToLogin}>Already have an Account</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
