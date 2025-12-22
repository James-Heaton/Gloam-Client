import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCharacters } from '../services/api';

export const MyAdventurers = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (err) {
        setError(err.message || 'Failed to load characters');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Adventurers</h1>
      <p>Welcome, {user?.username}!</p>
      
      <button onClick={handleLogout}>Logout</button>
      
      <Link to="/characters/new">
        <button>Create New Adventurer</button>
      </Link>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {characters.length === 0 ? (
        <p>You don't have any characters yet. Create one to get started!</p>
      ) : (
        <div>
          {characters.map((character) => (
            <div key={character.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <h3>{character.name}</h3>
              <p>Type: {character.character_type_name}</p>
              <p>HP: {character.hp}/{character.max_hp} | MP: {character.mp}/{character.max_mp}</p>
              <p>
                Traits: {character.traits.map(t => t.name).join(', ')}
              </p>
              
              <Link to={`/characters/${character.id}/edit`}>
                <button>Edit</button>
              </Link>
              
              <Link to={`/characters/${character.id}/delete`}>
                <button>Delete</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
