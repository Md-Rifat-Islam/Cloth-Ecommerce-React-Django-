// frontend/src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

import PrivateRoute from "./utils/PrivateRoute"; // Assuming PrivateRoute component exists
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Registerpage from "./components/Registerpage";
import Loginpage from "./components/Login";
import Sidebar from "./components/Sidebar"; // Import Sidebar

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <div className="d-flex">
                    {/* Always visible Sidebar */}
                    <Sidebar /> {/* Include Sidebar here if it's for every page */}

                    <div className="flex-grow-1 p-4">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Homepage />} />
                            <Route path="/login" element={<Loginpage />} />
                            <Route path="/register" element={<Registerpage />} />

                            {/* Protected Routes */}
                            <Route element={<PrivateRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
