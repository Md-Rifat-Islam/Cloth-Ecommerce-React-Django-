// frontend/src/components/Sidebar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../static/css/Sidebar.css"; // Import Sidebar CSS

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const expandSidebar = () => setIsExpanded(true);

  return (
    <div className={`sidebar-container shadow-sm ${isExpanded ? "" : "sidebar-collapsed"}`} onClick={expandSidebar}>
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
          <Link to="/about" className="sidebar-link">
            <span className="me-2">ℹ️</span>
            <span className="sidebar-text">About</span>
          </Link>
        </li>
        <li className="my-1">
          <Link to="/services" className="sidebar-link">
            <span className="me-2">🛠️</span>
            <span className="sidebar-text">Services</span>
          </Link>
        </li>
        <li className="my-1">
          <Link to="/contact" className="sidebar-link">
            <span className="me-2">📞</span>
            <span className="sidebar-text">Contact</span>
          </Link>
        </li>
      </ul>

      {/* Toggle button at the bottom */}
      <button className="toggle-button" onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}>
        {isExpanded ? "<" : ">"}
      </button>
    </div>
  );
};

export default Sidebar;



