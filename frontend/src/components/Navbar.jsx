// frontend/src/components/Navbar.jsx

import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaSearch, FaBell, FaBars, FaUserCircle } from "react-icons/fa";

import "../static/css/Navbar.css";

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("authTokens");
  let user_id = null;
  if (token) {
    try {
      const decoded = jwtDecode(JSON.parse(token).access);
      user_id = decoded.user_id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="./src/assets/cart.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fw-bold text-white">Smart Supply Network</span>
        </Link>

        {/* Large Screen Search Bar */}
        <div className="mx-3 flex-grow-1 d-none d-md-flex align-items-center">
          <form className="d-flex w-50">
            <input
              className="form-control form-control-sm rounded-pill"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              style={{ border: "none" }}
            />
            <button
              className="btn btn-light btn-sm ms-2 rounded-pill"
              type="submit"
              // style={{ padding: "0.25rem 1rem" }}
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="btn btn-light btn-sm d-lg-none ms-auto rounded-circle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ width: "40px", height: "40px" }}
        >
          <FaBars />
        </button>

        {/* Desktop Buttons */}
        <div className="d-none d-lg-flex align-items-center gap-3">

          <button className="btn btn-light btn-sm rounded-pill">
            Be a Member
          </button>
          <button className="btn btn-light btn-sm rounded-pill">
            New RFQ +
          </button>
          <button className="btn btn-outline-light btn-sm rounded-circle p-2">
            <FaBell />
          </button>
          <div className="dropdown">
            <button
              className="btn btn-light btn-sm dropdown-toggle rounded-circle p-2"
              type="button"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle size={20} />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="profileDropdown"
            >
              <li>
                <Link className="dropdown-item" to={`/profile/${user_id}`}>
                  {user ? user.username : "Profile"}
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={logoutUser}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Toggles On Click) */}
      {menuOpen && (
        <div
          className="container-fluid d-lg-none mt-2"
          style={{ background: "transparent" }}
        >
          <form className="d-flex w-10 mb-3">
            <input
              className="form-control form-control-sm rounded-pill"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              style={{ border: "none" }}
            />
            <button
              className="btn btn-light btn-sm ms-2 rounded-pill"
              type="submit"
              style={{ padding: "0.25rem 1rem" }}
            >
              <FaSearch />
            </button>
          </form>
          <div className="d-flex flex-column align-items-center gap-2">
            <button className="btn btn-light btn-sm w-100 rounded-pill">
              Be a Member
            </button>
            <button className="btn btn-warning btn-sm w-100 rounded-pill">
              New RFQ +
            </button>
            <button className="btn btn-outline-light btn-sm w-100 rounded-pill">
              <FaBell /> Notifications
            </button>
            <div className="dropdown w-100">
              <button
                className="btn btn-light btn-sm w-100 rounded-pill dropdown-toggle"
                type="button"
                id="profileDropdownMobile"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle className="me-2" /> Profile
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end w-100"
                aria-labelledby="profileDropdownMobile" 
              >
                <li>
                  <Link className="dropdown-item" to={`/profile/${user_id}`}>
                    {user ? user.username : "Profile"}
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logoutUser}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
