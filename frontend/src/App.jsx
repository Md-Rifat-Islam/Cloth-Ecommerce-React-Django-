// frontend/src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Registerpage from "./components/Registerpage";
import Loginpage from "./components/Login";


const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Loginpage />} />
                    <Route path="/register" element={<Registerpage />} />

                    {/* Protected Routes using PrivateRoute */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
