import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getCharacters, setActiveCharacter, resetGame } from '../services/api';

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

  const handlePlayGame = async (characterId) => {
    try {
      await setActiveCharacter(characterId);
      navigate('/game');
    } catch (err) {
      setError(err.message || 'Failed to set active character');
    }
  };

  const handleNewGame = async (characterId) => {
    try {
      await setActiveCharacter(characterId);
      await resetGame(characterId);
      navigate('/game');
    } catch (err) {
      setError(err.message || 'Failed to start new game');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Adventurers</h1>
      <p>Welcome, {user?.username}!</p>
      
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
              <p>Area: {character.current_area} | Gold: {character.gp} GP</p>
              <p>
                Traits: {character.traits.map(t => t.name).join(', ')}
              </p>

              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button onClick={() => handleNewGame(character.id)}>New Game</button>
                
                {character.current_area > 1 && (
                  <button onClick={() => handlePlayGame(character.id)}>Continue Game</button>
                )}
              
                <Link to={`/characters/${character.id}/edit`}>
                  <button>Edit</button>
                </Link>
                
                <Link to={`/characters/${character.id}/delete`}>
                  <button>Delete</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/characters/new">
      <button>Create New Adventurer</button>
      </Link>
    </div>
  );
};
