import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top custom-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🚀 Task Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-2">
              <Link className="nav-link cool-link" to="/signup">Signup</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link cool-link" to="/login">Login</Link>
            </li>
            <li className="nav-item mx-2">
              <button className="btn btn-sm btn-outline-light px-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


