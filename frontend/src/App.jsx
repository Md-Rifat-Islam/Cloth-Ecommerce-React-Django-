// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';

const App = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log('API URL:', import.meta.env.VITE_API_URL);
                const response = await fetch(`${import.meta.env.VITE_API_URL}posts/`);

                if (!response.ok) {
                    throw new Error('Failed to fetch posts: ' + response.statusText);
                }

                const result = await response.json();
                console.log('API Response:', result);
                setData(result);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Posts - Rifat</h1>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
                <Route path="/login" element={<Login />} />
                {/* You can add more routes here */}
            </Routes>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && data.length === 0 && <p>No posts available.</p>}
            {!loading && !error && data.length > 0 && (
                <ul>
                    {data.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
