// frontend/src/components/Login.jsx

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../static/css/Login.css"; // Import Login/Register CSS

// icons
import { FaLock } from "react-icons/fa";
import { SiGoogle, SiApple } from "react-icons/si";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Input validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setIsLoading(true);

    email.length > 0 && password.length > 0 && loginUser(email, password);

    setTimeout(() => {
      console.log("Email:", email);
      console.log("Password:", password);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="">
        <div className="text-center ">
          <h1 className="items-center">
            Sign In to <span style={{ color: "orange" }}>Easy Purchase</span>
          </h1>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            // flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // height: "100vh",
            // width: "100vw",
            // background: "linear-gradient(45deg, darkorange, rgb(240, 89, 40))",
          }}
        >
          {/* <div className="inline-block"> */}
          <img
            src="./src/assets/cart.png"
            alt="Cart"
            className="img-fluid"
            style={{ maxWidth: "45%", height: "auto", margin: "20px" }}
          />
          {/* </div> */}

          {/* <div className="flex flex-col justify-center items-center"> */}
          <form className="form" onSubmit={handleSubmit}>
            <div className="flex-column">
              <label></label>
              <div className="inputForm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  viewBox="0 0 32 32"
                  height={20}
                >
                  <g data-name="Layer 3" id="Layer_3">
                    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                  </g>
                </svg>
                <input
                  placeholder="Enter your Email"
                  className="input"
                  type="email"
                  id="email00"
                  // value={emzail}
                  // onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                />
              </div>
            </div>
            <div className="flex-column">
              <label></label>
              <div className="inputForm">
                <FaLock size={18} />
                <input
                  placeholder="Enter your Password"
                  className="input"
                  type="password"
                  id="password00"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  required
                />
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="flex-row">
              <div>
                <input type="checkbox" />
                <label>Remember me</label>
              </div>
              <span className="span">Forgot password?</span>
            </div>
            <button
              className="button-submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <p className="p">
              Don&apos;t have an account?
              <Link to="/register" className="span">
                Sign Up
              </Link>
            </p>
            <p className="p line">Or With</p>
            <div className="flex-row">
              <button className="btn google border border-2 rounded-pill">
                <SiGoogle size={20} />
                {/* Google */}
              </button>
              <button className="btn apple border border-2 rounded-pill">
                <SiApple size={22} />
                {/* Apple */}
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
