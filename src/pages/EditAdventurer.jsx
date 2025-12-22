import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCharacter, getCharacterTypes, getTraits, updateCharacter } from '../services/api';

export const EditAdventurer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [characterType, setCharacterType] = useState('');
  const [selectedTraits, setSelectedTraits] = useState([]);
  
  const [characterTypes, setCharacterTypes] = useState([]);
  const [traits, setTraits] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch character data and form options on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [character, typesData, traitsData] = await Promise.all([
          getCharacter(id),
          getCharacterTypes(),
          getTraits()
        ]);
        
        setName(character.name);
        setCharacterType(character.character_type);
        setSelectedTraits(character.traits.map(t => t.id));
        setCharacterTypes(typesData);
        setTraits(traitsData);
      } catch (err) {
        setError('Failed to load character data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTraitToggle = (traitId) => {
    if (selectedTraits.includes(traitId)) {
      setSelectedTraits(selectedTraits.filter(id => id !== traitId));
    } else {
      if (selectedTraits.length < 2) {
        setSelectedTraits([...selectedTraits, traitId]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!characterType) {
      setError('Please select a character type');
      return;
    }

    if (selectedTraits.length !== 2) {
      setError('Please select exactly 2 traits');
      return;
    }

    setSubmitting(true);

    try {
      await updateCharacter(id, {
        character_type: parseInt(characterType),
        trait_ids: selectedTraits
      });
      navigate('/characters');
    } catch (err) {
      setError(err.message || 'Failed to update character');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Adventurer</h1>
      
      <div style={{ backgroundColor: '#fff3cd', padding: '10px', marginBottom: '20px' }}>
        <strong>Warning:</strong> Editing your character will reset their adventure progress (HP, MP, and current location).
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Character Name:</label>
          <p><strong>{name}</strong></p>
        </div>

        <div>
          <label htmlFor="characterType">Character Type:</label>
          <select
            id="characterType"
            value={characterType}
            onChange={(e) => setCharacterType(e.target.value)}
            disabled={submitting}
          >
            <option value="">-- Select Type --</option>
            {characterTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} (HP: {type.max_hp}, MP: {type.max_mp})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Traits (pick 2):</label>
          {traits.map((trait) => (
            <div key={trait.id}>
              <input
                type="checkbox"
                id={`trait-${trait.id}`}
                checked={selectedTraits.includes(trait.id)}
                onChange={() => handleTraitToggle(trait.id)}
                disabled={submitting || (selectedTraits.length >= 2 && !selectedTraits.includes(trait.id))}
              />
              <label htmlFor={`trait-${trait.id}`}>
                {trait.name} - {trait.description}
              </label>
            </div>
          ))}
          <p>Selected: {selectedTraits.length}/2</p>
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <Link to="/characters">Cancel</Link>
    </div>
  );
};
