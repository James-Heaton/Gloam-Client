import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCharacter, deleteCharacter } from '../services/api';

export const DeleteConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await getCharacter(id);
        setCharacter(data);
      } catch (err) {
        setError('Failed to load character');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    setError('');

    try {
      await deleteCharacter(id);
      navigate('/characters');
    } catch (err) {
      setError(err.message || 'Failed to delete character');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="font-washington text-3xl text-stone-300">Loading...</div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="font-washington text-3xl text-red-500">Character not found</div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn flex justify-center items-start pt-40 pb-8 px-4 min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="font-washington text-5xl font-bold text-center text-stone-300 mb-8">
          Delete Adventurer
        </h1>
        
        {/* Warning Box */}
        <div className="bg-red-900/30 border-4 border-red-800 rounded-lg p-8 mb-6 ml-6 mr-6">
          <h2 className="font-washington text-3xl text-red-300 text-center mb-4">
            Are you sure you want to delete
          </h2>
          <h3 className="font-washington text-5xl font-bold text-center text-stone-100 mb-6">
            {character.name}?
          </h3>
          
          {/* Character Details */}
          <div className="bg-black/60 border-2 border-stone-700 rounded p-6 mb-6 space-y-3">
            <p className="text-stone-300 text-lg">
              <span className="text-stone-400">Type:</span> {character.character_type_name}
            </p>
            <p className="text-stone-300 text-lg">
              <span className="text-stone-400">HP:</span> {character.hp}/{character.max_hp}
              <span className="mx-3">|</span>
              <span className="text-stone-400">MP:</span> {character.mp}/{character.max_mp}
            </p>
            <p className="text-stone-300 text-lg">
              <span className="text-stone-400">Traits:</span> {character.traits.map(t => t.name).join(', ')}
            </p>
          </div>
          
          <p className="font-washington text-2xl text-red-400 text-center font-bold">
            ⚠️ This action cannot be undone!
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 text-red-100 px-4 py-3 border-2 border-red-900 rounded text-center mb-6">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={handleDelete} 
            disabled={deleting}
            className="font-washington flex-1 text-2xl bg-red-800 hover:bg-red-700 active:bg-red-900 
                      text-stone-100 py-4 px-3 rounded font-bold
                      transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-lg hover:shadow-red-900/50 ml-6"
          >
            {deleting ? 'Deleting...' : 'Yes, Delete Forever'}
          </button>

          <Link
            to="/characters"
            className="font-washington flex-1 text-2xl bg-stone-900 hover:bg-stone-800 
                        text-stone-300 py-4 px-3 rounded text-center no-underline
                        transition-all duration-300 border-2 border-stone-700 mr-6"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};
