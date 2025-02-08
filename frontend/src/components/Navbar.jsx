// frontend/src/components/Navbar.jsx

import { useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Fixed import
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  let user_id = null;
  if (token) {
    try {
      const decoded = jwtDecode(JSON.parse(token).access); // Ensure token is parsed correctly
      user_id = decoded.user_id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            style={{ width: "60px", padding: "1px" }}
            src="./src/assets/cart.png"
            alt="Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li> */}

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2 pe-2">
                  <Link className="nav-link btn btn-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link className="nav-link btn btn-link" to={`/profile/${user_id}`}>
                    {user.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={logoutUser}
                    style={{ cursor: "pointer", color: "white" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
