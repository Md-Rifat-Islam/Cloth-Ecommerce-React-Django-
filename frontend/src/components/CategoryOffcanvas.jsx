// frontend/src/components/CaegoryOffcanvas.jsx

import React from "react";
import "../static/css/CategoryOffcanvas.css";

export const CategoryOffcanvas = () => {
  return (
    <div>
      <button
        className="offcanvas-btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Select Category
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Please Select Category</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <h6>IT & Infrastructure</h6>

          <input type="checkbox" className="btn-check" id="hardware-devices" autoComplete="off" />
          <label className="btn" htmlFor="hardware-devices">
            Hardware & Devices
          </label>

          <input type="checkbox" className="btn-check" id="cloud-storage" autoComplete="off" />
          <label className="btn" htmlFor="cloud-storage">
            Cloud & Storage
          </label>

          <input type="checkbox" className="btn-check" id="networking-security" autoComplete="off" />
          <label className="btn" htmlFor="networking-security">
            Networking & Security
          </label>
        </div>
      </div>
    </div>
  );
};

export default CategoryOffcanvas;

