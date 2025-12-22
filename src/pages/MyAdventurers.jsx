import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const MyAdventurers = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>My Adventurers</h1>
      <p>Welcome, {user?.username}!</p>
      
      <button onClick={handleLogout}>Logout</button>
      
      <p>Character list will go here</p>
      <Link to="/characters/new">Create New Adventurer</Link>
      <br />
      <Link to="/characters/1/edit">Edit Adventurer</Link>
      <br />
      <Link to="/characters/1/delete">Delete Adventurer</Link>
    </div>
  );
};
