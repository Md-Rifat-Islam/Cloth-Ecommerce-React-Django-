// frontend/src/components/Dashboard.jsx

import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  // State to hold the response from the API call
  const [res, setRes] = useState("");

  // Axios hook for API requests
  const api = useAxios();

  // Get authentication tokens from localStorage
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));

  // Decode JWT token to extract user information
  let user_id, username, full_name, image;
  if (authTokens) {
    const decoded = jwtDecode(authTokens.access);
    user_id = decoded.user_id;
    username = decoded.username;
    full_name = decoded.full_name;
    image = decoded.image;
  }

  // Fetch data using fetch API instead of useAxios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/posts/test/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRes(data.message || "No response message");
      } catch (error) {
        console.error("Error fetching data:", error);
        setRes("Something went wrong");
      }
    };

    if (authTokens) {
      fetchData();
    }
  }, [authTokens]);

  return (
    <div className="dashboard-container">
      <div
        className="container-fluid"
        style={{ paddingTop: "80px", minHeight: "100vh" }}
      >
        <div className="row" style={{ height: "100%" }}>
          {/* Sidebar */}
          <nav className="col-md-2 d-none d-md-block bg-light sidebar mt-4">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <span data-feather="home" />
                    Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file" />
                    Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="shopping-cart" />
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="users" />
                    Customers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="bar-chart-2" />
                    Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="layers" />
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main content */}
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
            style={{ height: "100%" }}
          >
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">My Dashboard</h1>
              <span>Hello {username}!</span>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                  <button className="btn btn-sm btn-outline-secondary">
                    Share
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    Export
                  </button>
                </div>
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                  <span data-feather="calendar" />
                  This week
                </button>
              </div>
            </div>

            {/* Response message */}
            <div className="alert alert-success">
              <strong>{res}</strong>
            </div>

            {/* Section title */}
            <h2>Section title</h2>

            {/* Table with sample data */}
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1,001</td>
                    <td>Lorem</td>
                    <td>ipsum</td>
                    <td>dolor</td>
                    <td>sit</td>
                  </tr>
                  <tr>
                    <td>1,002</td>
                    <td>amet</td>
                    <td>consectetur</td>
                    <td>adipiscing</td>
                    <td>elit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
