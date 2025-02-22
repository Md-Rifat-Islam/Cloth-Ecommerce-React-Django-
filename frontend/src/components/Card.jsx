// frontend/src/components/Card.jsx

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Card = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <img
              src=""
              className="card-img-top"
              alt="Card Image"
            />
            <div className="card-body">
              <h5 className="card-title">Card Title</h5>
              <p className="card-text">
                This is a simple card using Bootstrap styling.
              </p>
              <a href="#" className="btn btn-primary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

