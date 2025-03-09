// frontend/src/components/Homepage.jsx

import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import SupplierCard from "./SupplierCard";
import "../static/css/Homepage.css";

const Homepage = ({ isSidebarExpanded }) => {
  // console.log("Sidebar Expanded:", isSidebarExpanded);

  return (
    <div className={`homepage ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>We Connect</h2>
          <h1>Buyers and Sellers</h1>
          <p>
            <span style={{ color: "#000000" }}>Smart Supply Network </span>
            is a Global B2B Platform for Suppliers and Buyers to:
          </p>
          <h4>Find, Connect, and Communicate</h4>
          <h3>- Digitally.</h3>

          <div className="hero-buttons">
            <button className="btn-primary" aria-label="Get Started">
              Get Started
            </button>
            <button className="btn-outline" aria-label="Learn More">
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="./src/assets/businessman-showing-business-chart.svg"
            alt="Businessman showing business chart"
            width="100%"
          />
        </div>
      </section>
      <SupplierCard />
    </div>
  );
};

Homepage.propTypes = {
  isSidebarExpanded: PropTypes.bool.isRequired,
};

export default Homepage;
