// frontend/src/components/Sidebar.jsx

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../static/css/Sidebar.css"; 

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  
  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar sidebar-container shadow-sm ${isExpanded ? "" : "sidebar-collapsed"}`}>
      <ul className="list-unstyled pt-4 mt-5">
        <li className="my-1">
          <Link to="/" className="sidebar-link">
            <span className="me-2">🏠</span>
            <span className="sidebar-text">Home</span>
          </Link>
        </li>
        <li className="my-1">
          <Link to="/dashboard" className="sidebar-link">
            <span className="me-2">📊</span>
            <span className="sidebar-text">Dashboard</span>
          </Link>
        </li>
        <li className="my-1">
          <Link to="/category" className="sidebar-link">
            <span className="me-2">📂</span>
            <span className="sidebar-text">Category</span>
          </Link>
        </li>
        <li className="my-1">
          <Link to="/view-rfq" className="sidebar-link">
            <span className="me-2">📑</span>
            <span className="sidebar-text">View RFQ</span>
          </Link>
        </li>
        <li className="my-1">
          <Link to="/quotes-orders" className="sidebar-link">
            <span className="me-2">📜</span>
            <span className="sidebar-text">Quotes Orders</span>
          </Link>
        </li>
        <li className="my-1">
          <Link to="/about" className="sidebar-link">
            <span className="me-2">ℹ️</span>
            <span className="sidebar-text">About</span>
          </Link>
        </li>
        <li className="my-1">
          <Link to="/settings" className="sidebar-link">
            <span className="me-2">⚙️</span>
            <span className="sidebar-text">Settings</span>
          </Link>
        </li>
      </ul>

      {/* Toggle button at the bottom */}
      <button className="toggle-button" onClick={toggleSidebar}>
        {isExpanded ? "<" : ">"}
      </button>
    </div>
  );
};
Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  setIsExpanded: PropTypes.func.isRequired,
};

export default Sidebar;

