import React, { useState, useRef, useEffect } from "react";
import "./Login.css";

import axios from "axios";

const Login = props => {
  const userEmailEl = useRef(null);
  const userPassEl = useRef(null);
  const [loggedIn, setloggedIn] = useState(false);
  const [error, setError] = useState(null);
  // Your Google API Key.
  const API_KEY = "YOUR GOOGLE API KEY";

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    const expirationTime = localStorage.getItem("expirationTime");
    if (idToken && Number(expirationTime) > new Date().getTime()) {
      setloggedIn(true);
    } else {
      localStorage.removeItem("idToken");
      localStorage.removeItem("expirationTime");      
    }
  }, []);

  const submitClicked = event => {
    event.preventDefault();
    setError(null);
    const authURL =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=";
    const userInfo = {
      email: userEmailEl.current.value,
      password: userPassEl.current.value,
      returnSecureToken: true
    };
    axios
      .post(authURL + API_KEY, userInfo)
      .then(res => {
        if (res && res.data) {
          const expiresIn = res.data.expiresIn
            ? res.data.expiresIn * 1000
            : 3600 * 1000;
          const expirationTime = String(
            new Date(new Date().getTime() + expiresIn).getTime()
          );
          localStorage.setItem("idToken", res.data.idToken);
          localStorage.setItem("expirationTime", expirationTime);
          props.history.push("/admin");
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const logout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("expirationTime");      
    props.history.push("/results");
  }

  return (
    <div className="Login">
      {
        loggedIn ? <p>Already Logged In <button onClick={logout}>Logout</button></p> : (
          <form className="Login-form" onSubmit={submitClicked}>
          <label className="Login-form-label">Email:</label>
          <input
            className="Login-form-input"
            name="email"
            type="email"
            placeholder="Email address"
            ref={userEmailEl}
            required
          />
          <br />
          <label className="Login-form-label">Password:</label>
          <input
            className="Login-form-input"
            name="password"
            type="password"
            placeholder="Password"
            ref={userPassEl}
            required
          />
          <br />
          <button className="Login-form-submit" type="submit">
            Login
          </button>
        </form>  
        )
      }
      <p className="Error">{error}</p>
    </div>
  );
};

export default Login;
