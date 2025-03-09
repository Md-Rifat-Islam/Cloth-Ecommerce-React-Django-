//frontend/src/components/Registerpage.jsx

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import "../static/css/Login.css"; // Import Login/Register CSS

// icons
import { FaLock } from "react-icons/fa";
import { SiGoogle, SiApple } from "react-icons/si";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = (response) => {
    console.log("Google Token:", response.credential);

    fetch("http://127.0.0.1:8000/api/auth/google/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Registration Successful", data);
      })
      .catch((err) => console.error("Google Registration Failed", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      // Auto-generate username from email if '@' is present
      if (name === "email" && value.includes("@")) {
        updatedData.username = value.split("@")[0];
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, username, password, confirmPassword } = formData;

    if (!email.includes("@")) {
      setFormData((prev) => ({
        ...prev,
        error: "Please enter a valid email address.",
      }));
      return;
    }
    if (password.length < 8) {
      setFormData((prev) => ({
        ...prev,
        error: "Password must be at least 8 characters long.",
      }));
      return;
    }
    if (password !== confirmPassword) {
      setFormData((prev) => ({ ...prev, error: "Passwords do not match." }));
      return;
    }

    setFormData((prev) => ({ ...prev, error: "" }));
    setIsLoading(true);

    try {
      await registerUser(username, email, password, confirmPassword);
    } catch (error) {
      console.error("Registration error:", error);
      const errorResponse = await error.response.json();
      console.log("Error response:", errorResponse);
      setFormData((prev) => ({ ...prev, error: "Registration failed" }));
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="login-page">
        <div className="text-center">
          <h1 className="items-center">
            Register to <span style={{ color: "var(--primary-color)" }}>Smart Supply Network</span>
          </h1>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "Center",
            alignItems: "center",
          }}
        >
          <img
            src="./src/assets/cart.png"
            alt="Cart"
            className="img-fluid"
            // style={{
            //   maxWidth: "45%",
            //   height: "auto",
            //   margin: "20px",
            // }}
          />
          <form className="form" onSubmit={handleSubmit}>
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
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-column">
              <label></label>
              <div className="inputForm">
                <FaLock size={18} />
                <input
                  placeholder="Enter your Password"
                  className="input"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex-column">
              <label></label>
              <div className="inputForm">
                <FaLock size={18} />
                <input
                  placeholder="Confirm your Password"
                  className="input"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {formData.error && <p className="error">{formData.error}</p>}
            <button
              className="button-submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <p className="p">
              Already have an account?
              <Link to="/login" className="span">
                Sign In
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
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
