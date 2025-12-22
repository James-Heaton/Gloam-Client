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
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div>
      <h1>Delete Adventurer</h1>
      
      <div style={{ backgroundColor: '#f8d7da', padding: '20px', marginBottom: '20px', border: '1px solid #f5c6cb' }}>
        <h2>Are you sure you want to delete</h2>
        <h1>{character.name}</h1>
        
        <div style={{ backgroundColor: 'white', padding: '15px', margin: '10px 0' }}>
          <p><strong>Type:</strong> {character.character_type_name}</p>
          <p><strong>HP:</strong> {character.hp}/{character.max_hp} | <strong>MP:</strong> {character.mp}/{character.max_mp}</p>
          <p><strong>Traits:</strong> {character.traits.map(t => t.name).join(', ')}</p>
        </div>
        
        <p><strong>This action cannot be undone!</strong></p>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button 
        onClick={handleDelete} 
        disabled={deleting}
        style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 20px', marginRight: '10px' }}
      >
        {deleting ? 'Deleting...' : 'Yes, Delete Forever'}
      </button>

      <Link to="/characters">
        <button style={{ padding: '10px 20px' }}>
          Cancel
        </button>
      </Link>
    </div>
  );
};
