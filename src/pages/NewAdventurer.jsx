import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCharacterTypes, getTraits, createCharacter } from '../services/api';

export const NewAdventurer = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [characterType, setCharacterType] = useState('');
  const [selectedTraits, setSelectedTraits] = useState([]);
  
  const [characterTypes, setCharacterTypes] = useState([]);
  const [traits, setTraits] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch character types and traits on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesData, traitsData] = await Promise.all([
          getCharacterTypes(),
          getTraits()
        ]);
        setCharacterTypes(typesData);
        setTraits(traitsData);
      } catch (err) {
        setError('Failed to load form data');
      }
    };

    fetchData();
  }, []);

  const handleTraitToggle = (traitId) => {
    if (selectedTraits.includes(traitId)) {
      // Remove trait
      setSelectedTraits(selectedTraits.filter(id => id !== traitId));
    } else {
      // Add trait (only if less than 2)
      if (selectedTraits.length < 2) {
        setSelectedTraits([...selectedTraits, traitId]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Character name is required');
      return;
    }

    if (!characterType) {
      setError('Please select a character type');
      return;
    }

    if (selectedTraits.length !== 2) {
      setError('Thou shalt select exactly 2 traits. No more. No less. 2 shall be the number of traits thou shalt select, and the number of traits selected shall be 2. 3 traits shalt thou not select, neither select thou 1, except that thou then proceed to 2. 4 is RIGHT OUT.');
      return;
    }

    setLoading(true);

    const characterData = {
      name: name.trim(),
      character_type: parseInt(characterType),
      trait_ids: selectedTraits
    };
    console.log('Sending to API:', characterData);

    try {
      await createCharacter({
        name: name.trim(),
        character_type: parseInt(characterType),
        trait_ids: selectedTraits
      });
      navigate('/characters');
    } catch (err) {
      setError(err.message || 'Failed to create character');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Adventurer</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Character Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="characterType">Character Type:</label>
          <select
            id="characterType"
            value={characterType}
            onChange={(e) => setCharacterType(e.target.value)}
            disabled={loading}
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
          <label>Traits (select exactly 2):</label>
          {traits.map((trait) => (
            <div key={trait.id}>
              <input
                type="checkbox"
                id={`trait-${trait.id}`}
                checked={selectedTraits.includes(trait.id)}
                onChange={() => handleTraitToggle(trait.id)}
                disabled={loading || (selectedTraits.length >= 2 && !selectedTraits.includes(trait.id))}
              />
              <label htmlFor={`trait-${trait.id}`}>
                {trait.name} - {trait.description}
              </label>
            </div>
          ))}
          <p>Selected: {selectedTraits.length}/2</p>
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Character'}
        </button>
      </form>

      <Link to="/characters">Cancel</Link>
    </div>
  );
};
