// frontend/src/components/Homepage.jsx

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Homepage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        {/* Sidebar */}
        <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
          <Sidebar />
          {/* <button className="toggle-btn" onClick={toggleSidebar}>
            {isCollapsed ? "Expand" : "Collapse"}
          </button> */}
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h1 className="text-center text-2xl font-bold my-4">
            Welcome to Homepage
          </h1>

          {/* Carousel Section */}
          <div className="carousel-container">
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="../src/assets/sunset.jpg"
                    className="d-block w-100"
                    alt="Slide 1"
                  />
                  <div className="carousel-caption">
                    <h3>Beautiful Sunset</h3>
                    <p>Experience the breathtaking view</p>
                  </div>
                </div>

                <div className="carousel-item">
                  <img
                    src="../src/assets/sunset.jpg"
                    className="d-block w-100"
                    alt="Slide 2"
                  />
                  <div className="carousel-caption">
                    <h3>Golden Hour</h3>
                    <p>Capture the beauty of nature</p>
                  </div>
                </div>

                <div className="carousel-item">
                  <img
                    src="../src/assets/sunset.jpg"
                    className="d-block w-100"
                    alt="Slide 3"
                  />
                  <div className="carousel-caption">
                    <h3>Tranquility</h3>
                    <p>Relax and enjoy the moment</p>
                  </div>
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {/* End Carousel Section */}
        </div>
      </div>
    </>
  );
};

export default Homepage;
