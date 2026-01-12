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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-stone-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn flex justify-center items-start pt-40 pb-8 px-4 min-h-screen">
      <div className="w-full max-w-3xl">
        <h1 className="font-washington text-5xl font-bold text-center text-stone-300 mb-4">
          My Characters
        </h1>
        <p className="font-washington text-2xl text-center text-stone-400 mb-8">
          Welcome, {user?.username}
        </p>
        
        {error && (
          <div className="bg-red-900/50 text-red-100 px-4 py-3 border-2 border-red-900 rounded text-center mb-6">
            {error}
          </div>
        )}

        {characters.length === 0 ? (
          <div className="bg-black/0 p-12 text-center mb-6">
            <p className="text-xl text-stone-300 mb-6">
              You don't have any characters yet. Create one to begin your adventure!
            </p>
          </div>
        ) : (
          <div className="space-y-6 mb-6 ml-6 mr-6">
            {characters.map((character) => (
              <div 
                key={character.id} 
                className="bg-black/90 border-4 border-stone-700 rounded-lg p-6 shadow-2xl hover:border-stone-600 transition-colors"
              >
                <div className="flex flex-col flex-row items-center justify-between gap-4">
                  {/* Character Info */}
                  <div className="flex-1">
                    <h3 className="font-washington text-3xl font-bold text-stone-200 mb-3">
                      {character.name}
                    </h3>
                    
                    <div className="space-y-2 text-stone-300">
                      <p className="text-lg">
                        <span className="text-stone-400">Type:</span> {character.character_type_name}
                      </p>
                      <p className="text-lg">
                        <span className="text-stone-400">HP:</span> {character.hp}/{character.max_hp} 
                        <span className="mx-3">|</span>
                        <span className="text-stone-400">MP:</span> {character.mp}/{character.max_mp}
                      </p>
                      <p className="text-lg">
                        <span className="text-stone-400">Area:</span> {character.current_area} 
                        <span className="mx-3">|</span>
                        <span className="text-stone-400">Treasure:</span> {character.gp} GP
                      </p>
                      <p className="text-lg">
                        <span className="text-stone-400">Traits:</span> {character.traits.map(t => t.name).join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 md:min-w-[200px]">
                    <button 
                      onClick={() => handleNewGame(character.id)}
                      className="font-washington text-xl bg-stone-700 hover:bg-red-800 text-stone-100 
                                py-2 px-4 rounded transition-all duration-300 shadow-lg hover:shadow-red-900/50"
                    >
                      New Game
                    </button>
                    
                    {character.current_area > 1 && (
                      <button 
                        onClick={() => handlePlayGame(character.id)}
                        className="font-washington text-xl bg-amber-700 hover:bg-amber-600 text-stone-100 
                                  py-2 px-4 rounded transition-all duration-300 shadow-lg hover:shadow-amber-900/50"
                      >
                        Continue
                      </button>
                    )}
                  
                    <Link 
                      to={`/characters/${character.id}/edit`}
                      className="font-washington text-xl bg-stone-800 hover:bg-stone-700 text-stone-300 
                                py-2 px-4 rounded text-center no-underline transition-all duration-300"
                    >
                      Edit
                    </Link>
                    
                    <Link 
                      to={`/characters/${character.id}/delete`}
                      className="font-washington text-xl bg-stone-900 hover:bg-red-800 text-stone-400 hover:text-stone-200
                                py-2 px-4 rounded text-center no-underline transition-all duration-300 shadow-lg hover:shadow-red-900/50"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create New Character Button */}
        <div className="flex justify-center">
          <Link 
            to="/characters/new"
            className="font-washington text-2xl bg-stone-700 hover:bg-red-800 text-stone-100 
                      py-4 px-8 rounded no-underline transition-all duration-300 
                      shadow-lg hover:shadow-red-900/50 inline-block"
          >
            Create New Character
          </Link>
        </div>
      </div>
    </div>
  );
};
