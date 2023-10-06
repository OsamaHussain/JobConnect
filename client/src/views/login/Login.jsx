import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import jwtDecode from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(jwtDecode(res.data.token)));
      setLoggedIn(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleNavigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={hidden ? "hidden" : "visible"}>
      <div className="login-container">
        <h2>Login</h2>
        <div className="login-form">
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btnSubmit">
            <button onClick={handleLogin}>Login</button>
            <a onClick={handleNavigateToSignup}>Create Account</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
