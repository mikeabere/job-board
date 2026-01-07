import { useState } from "react";
import Navbarstyles from "./assets/css/Navbar.css";
function Navbar({ user, logout, setCurrentPage, currentPage }) {
    const [currentPage, setCurrentPage] = useState('home');

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo" onClick={() => setCurrentPage('home')}>JobBoard</h1>
        <div className="nav-links">
          <button 
            className={currentPage === 'home' ? 'active' : ''} 
            onClick={() => setCurrentPage('home')}
          >
            Jobs
          </button>
          {user ? (
            <>
              {user.role === 'employer' && (
                <>
                  <button 
                    className={currentPage === 'post-job' ? 'active' : ''} 
                    onClick={() => setCurrentPage('post-job')}
                  >
                    Post Job
                  </button>
                  <button 
                    className={currentPage === 'my-jobs' ? 'active' : ''} 
                    onClick={() => setCurrentPage('my-jobs')}
                  >
                    My Jobs
                  </button>
                </>
              )}
              {user.role === 'applicant' && (
                <button 
                  className={currentPage === 'my-applications' ? 'active' : ''} 
                  onClick={() => setCurrentPage('my-applications')}
                >
                  My Applications
                </button>
              )}
              <span className="user-name">Hello, {user.name}</span>
              <button onClick={logout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setCurrentPage('login')}>Login</button>
              <button onClick={() => setCurrentPage('register')} className="register-btn">Register</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;