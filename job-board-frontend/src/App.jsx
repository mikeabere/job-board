import React, { useState, useEffect } from 'react';
import {Router, Routes, Route, Link} from 'react-router-dom'; //will refactor 
import './App.css';
import {Login, Register} from './pages/index';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
  }, [token]);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="App">
      <Navbar 
        user={user} 
        logout={logout} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <div className="main-content">
        {!user && currentPage === 'login' && <Login login={login} setCurrentPage={setCurrentPage} />}
        {!user && currentPage === 'register' && <Register login={login} setCurrentPage={setCurrentPage} />}
        {currentPage === 'home' && <JobList user={user} token={token} />}
        {currentPage === 'post-job' && user?.role === 'employer' && <PostJob token={token} />}
        {currentPage === 'my-jobs' && user?.role === 'employer' && <MyJobs token={token} />}
        {currentPage === 'my-applications' && user?.role === 'applicant' && <MyApplications token={token} />}
      </div>
    </div>
  );
}

export default App;
