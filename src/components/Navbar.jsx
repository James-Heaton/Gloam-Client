import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* App Name */}
        <Link to="/characters" className="navbar-logo">
          Gloam: The Winding Path
        </Link>

        {/* Burger Icon */}
        <button onClick={toggleMenu} className="burger-menu">
          ☰
        </button>

        {/* Nav Links */}
        <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
          <Link to="/characters" className="nav-link" onClick={() => setIsOpen(false)}>
            My Adventurers
          </Link>
          <button onClick={handleLogout} className="logout-button">
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};