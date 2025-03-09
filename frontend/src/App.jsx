// frontend/src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

import PrivateRoute from "./utils/PrivateRoute"; 
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Registerpage from "./components/Registerpage";
import Loginpage from "./components/Login";
import Sidebar from "./components/Sidebar";

const AppContent = () => {
    const location = useLocation();
    const hideSidebarRoutes = ["/login", "/register"];
    const isAuthPage = hideSidebarRoutes.includes(location.pathname);

    // ✅ Centralized sidebar state
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    return (
        <div className={`d-flex ${isAuthPage ? "sidebar-hidden" : ""}`}>
            {!isAuthPage && <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />}
            <div className={`content-container ${isSidebarExpanded ? "expanded" : "collapsed"} ${isAuthPage ? "auth-page" : ""}`}>
                {!isAuthPage && <Navbar />}
                <Routes>
                    <Route path="/" element={<Homepage isSidebarExpanded={isSidebarExpanded} />} />
                    <Route path="/login" element={<Loginpage />} />
                    <Route path="/register" element={<Registerpage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

export default App;

