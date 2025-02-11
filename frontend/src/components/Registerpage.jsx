//frontend/src/components/Registerpage.jsx

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loginpage from "./Login";
import AuthContext from "../context/AuthContext";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
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

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Extract username (portion before '@') only if '@' exists
    if (emailValue.includes("@")) {
      const extractedUsername = emailValue.split("@")[0];
      setUsername(extractedUsername);
    } else {
      setUsername(""); // Reset username if '@' is removed
    }
  };

  console.log(email, username, password, confirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await registerUser(username, email, password, confirmPassword);
    } catch (error) {
      console.error("Registration error:", error);
      const errorResponse = await error.response.json();  // Parse response if available
      console.log("Error response:", errorResponse);
      throw new Error("Registration failed");
    }
    
    setIsLoading(false);
  };

  return (
    <StyledWrapper>
      <div className="pt-5" >
        <div className="text-center pt-5">
          <h1 className="items-center">
            Register to <span style={{ color: "orange" }}>Easy Purchase</span>
          </h1>
        </div>
        <div className="container" style={{ padding: "0px", margin: "0px" }}>
          <img
            src="./src/assets/cart.png"
            alt="Cart"
            className="img-fluid"
            style={{ maxWidth: "45%", height: "auto", margin: "20px" }}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEmailChange(e);
                }}
                
                required
              />
            </div>
            <div className="flex-column">
              <label>Password</label>
              <div className="inputForm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  viewBox="-64 0 512 512"
                  height={20}
                >
                  <path d="M336 512H48c-26.5 0-48-21.5-48-48V240c0-26.5 21.5-48 48-48h288c26.5 0 48 21.5 48 48v224c0 26.5-21.5 48-48 48z" />
                  <path d="M304 224c-8.8 0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96 43.1-96 96v80c0 8.8-7.2 16-16 16s-16-7.2-16-16v-80c0-70.6 57.4-128 128-128s128 57.4 128 128v80c0 8.8-7.2 16-16 16z" />
                </svg>
                <input
                  placeholder="Enter your Password"
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex-column">
              <label>Confirm Password</label>
              <div className="inputForm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  viewBox="-64 0 512 512"
                  height={20}
                >
                  <path d="M336 512H48c-26.5 0-48-21.5-48-48V240c0-26.5 21.5-48 48-48h288c26.5 0 48 21.5 48 48v224c0 26.5-21.5 48-48 48z" />
                  <path d="M304 224c-8.8 0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96 43.1-96 96v80c0 8.8-7.2 16-16 16s-16-7.2-16-16v-80c0-70.6 57.4-128 128-128s128 57.4 128 128v80c0 8.8-7.2 16-16 16z" />
                </svg>
                <input
                  placeholder="Confirm your Password"
                  className="input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            <button
              className="button-submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <p className="p">
              Already have an account? 
              <Link to="/login" className="span">Sign In</Link>
            </p>
            <p className="p line">Or With</p>
            <div className="flex-row">
              <button className="btn google">
                <svg
                  xmlSpace="preserve"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  viewBox="0 0 512 512"
                  y="0px"
                  x="0px"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  width={20}
                  version="1.1"
                >
                  <path
                    d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
      	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
      	C103.821,274.792,107.225,292.797,113.47,309.408z"
                    style={{ fill: "#FBBB00" }}
                  />
                  <path
                    d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
      	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
      	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                    style={{ fill: "#518EF8" }}
                  />
                  <path
                    d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
      	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
      	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                    style={{ fill: "#28B446" }}
                  />
                  <path
                    d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
      	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
      	C318.115,0,375.068,22.126,419.404,58.936z"
                    style={{ fill: "#F14336" }}
                  />
                </svg>
                Google
              </button>
              <button className="btn apple">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  viewBox="0 0 22.773 22.773"
                  height={20}
                >
                  <g>
                    <path d="M15.769 0c.053 0 .106 0 .162 0c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0z" />
                    <path d="M20.67 16.716c0 .016 0 .03 0 .045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334c-1.367 0-2.275-.879-3.676-.903c-1.482-.024-2.297.735-3.652.926c-.155 0-.31 0-.462 0c-.995-.144-1.798-.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-.34 0-.679 0-1.019c.105-2.482 1.311-4.5 2.914-5.478c.846-.52 2.009-.963 3.304-.765c.555.086 1.122.276 1.619.464c.471.181 1.06.502 1.618.485c.378-.011.754-.208 1.135-.347c1.116-.403 2.21-.865 3.652-.648c1.733.262 2.963 1.032 3.723 2.22c-1.466.933-2.625 2.339-2.427 4.74c1.191 2.752 2.459 4.028 3.723 4.739c0 .016 0 .03 0 .045z" />
                  </g>
                </svg>
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: linear-gradient(45deg, darkorange, rgb(240, 89, 40));
    padding: 30px;
    width: 50%;
    max-width: 500px;
    border-radius: 20px;
    font-family: -apple-system, Inter, system-ui, Avenir, Helvetica, Arial, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    transition: background 0.3s ease;
  }
  //--------------------------------
  /* For desktop and larger screens */
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 80vh; /* Full screen height */
    width: 100vw;  /* Full screen width */
}


    width: 100%; /* Ensure form takes full width on mobile */
    z-index: 1;
  }

  .img-fluid {
    max-width: 45%;
    height: auto;

    border-radius: 20px;
    margin: 20px;
  }

  /* For mobile view */
  @media (max-width: 768px) {
    .container {
      flex-direction: column; /* Stack image and form vertically on small screens */
      align-items: flex-start;
    }

    .form {
      width: 100%; /* Adjust form width for mobile */
      padding: 20px; /* Adjust padding for mobile */
    }

    .img-fluid {
      max-width: 50%; /* Adjust image size for mobile */
      height: auto;
      margin-bottom: 20px; /* Add space between image and form */
    }
  }
  // ----------------------------
  .form:hover {
    background: linear-gradient(45deg, darkorange, hsl(26, 100%, 73.5%));
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: white;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid hsl(0, 0%, 100%);
    border-radius: 10em;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
    // background-color: white;
  }

  .input {
    margin-left: 10px;
    border-radius: 10rem;
    border: none;
    color: black;
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-weight: 500;
    background: transparent;
  }

  .input:focus {
    outline: none;
  }

  .input::placeholder {
    /* Modern browsers */
    color: hsl(0, 1.60%, 37.50%);
    font-style: italic;
  }

  // .inputForm:focus-within {
  //   border: 1.5px solid orange;
  // }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: white;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: white;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    position: relative;
    display: inline-block;
    padding: 15px 30px;
    text-align: center;
    letter-spacing: 1px;
    text-decoration: none;
    background: transparent;
    transition: ease-out 0.5s;
    border: 2px solid;
    border-radius: 10em;
    box-shadow: inset 0 0 0 0 orange;
    margin: 20px 0 10px 0;
    color: white;
    font-size: 15px;
    font-weight: 500;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 orange;
  }

  .button-submit:active {
    transform: scale(0.9);
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    // background-color: black;
    background: transparent;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid white;
    box-shadow: inset 0 -100px 0 0 orange;
  }
`;

export default RegisterPage;
