import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAuth } from '../../helpers/auth';

const AppNavbar = () => {
  // Init state
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const settings = useSelector(state => state.settings);
  const { onAllowRegistration } = settings;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth
  useEffect(() => {
    auth.uid ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, [auth.uid]);

  // Handle logout
  const onLogoutClick = e => {
    e.preventDefault();
    logout().then(() => navigate('/login'));
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Client Panel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav mr-auto">
            {isAuthenticated && (
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashbord
                </Link>
              </li>
            )}
          </ul>
          {isAuthenticated && (
            <ul className=" navbar-nav ml-auto">
              <li className="nav-item mx-auto">
                <a href="#!" className="nav-link">
                  {auth.email}
                </a>
              </li>
              <li className="nav-item mx-auto">
                <Link to="/settings" className="nav-link">
                  Settings
                </Link>
              </li>
              <li className="nav-item mx-auto">
                <a href="#!" className="nav-link" onClick={onLogoutClick}>
                  LogOut
                </a>
              </li>
            </ul>
          )}
          {!isAuthenticated && onAllowRegistration ? (
            <ul className=" navbar-nav ml-auto">
              <li className="nav-item  ">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item  ">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
