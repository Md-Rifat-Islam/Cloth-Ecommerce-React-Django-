// frontend/src/context/AuthContext.jsx

import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

// Create authentication context
const AuthContext = createContext(null);
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? jwtDecode(JSON.parse(tokens).access) : null;
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/posts/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/");

        swal.fire({
          title: "Login Successful",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-middle",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        throw new Error(data.detail || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      swal.fire({
        title: "Username/password incorrect",
        text: error.message,
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-middle",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const registerUser = async (username, email, password, confirmPassword) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/posts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration (code 200 or 201)
        navigate("/login");
        swal.fire({
          title: "Registration Successful",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-middle",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        // Handle errors returned by backend (including validation errors)
        const errorMessage = data.detail || data.error || "Registration failed";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Registration error:", error);
      swal.fire({
        title: "An Error Occurred",
        text: error.message,
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      //   console.log(error); // Check the exact structure of the error message returned by the API
      //   const errorMessage = error.detail || "Registration failed";
      //   throw new Error(errorMessage);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    navigate("/login");
    swal.fire({
      title: "Logged out",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-middle",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens]);

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
