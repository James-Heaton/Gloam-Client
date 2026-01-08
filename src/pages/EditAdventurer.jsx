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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="font-washington text-3xl text-stone-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn flex justify-center items-start pt-32 pb-8 px-4 min-h-screen">
      <div className="w-full max-w-2xl bg-black/0 p-8">
        <h1 className="font-washington text-5xl font-bold text-center text-stone-300 mb-6">
          Edit Character
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Character Name (Read-only) */}
          <div>
            <span className="font-washington text-3xl text-stone-100 px-0 py-3">
              {name}
            </span>
          </div>

          {/* Character Type */}
          <div>
            <label 
              htmlFor="characterType"
              className="font-washington block text-stone-300 mb-2 text-xl font-medium"
            >
              Character Type
            </label>
            <select
              id="characterType"
              value={characterType}
              onChange={(e) => setCharacterType(e.target.value)}
              disabled={submitting}
              className="w-full px-4 py-3 bg-stone-900/80 border-2 border-stone-700 rounded text-stone-100 
                        focus:outline-none focus:border-stone-400
                        disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">-- Select Type --</option>
              {characterTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} (HP: {type.max_hp}, MP: {type.max_mp})
                </option>
              ))}
            </select>
          </div>

          {/* Traits */}
          <div>
            <label className="font-washington block text-stone-300 mb-3 text-xl font-medium">
              Traits (select exactly 2)
            </label>
            <div className="space-y-3">
              {traits.map((trait) => (
                <label
                  key={trait.id}
                  className={`flex items-start p-4 border-2 rounded cursor-pointer transition-all
                    ${selectedTraits.includes(trait.id) 
                      ? 'bg-stone-800/50 border-red-800' 
                      : 'bg-stone-900/50 border-stone-700 hover:border-stone-500'
                    }
                    ${submitting || (selectedTraits.length >= 2 && !selectedTraits.includes(trait.id)) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                    }`}
                >
                  <input
                    type="checkbox"
                    id={`trait-${trait.id}`}
                    checked={selectedTraits.includes(trait.id)}
                    onChange={() => handleTraitToggle(trait.id)}
                    disabled={submitting || (selectedTraits.length >= 2 && !selectedTraits.includes(trait.id))}
                    className="mt-1 mr-3 w-5 h-5 cursor-pointer"
                  />
                  <div>
                    <div className="font-washington text-stone-200 text-lg font-semibold">
                      {trait.name}
                    </div>
                    <div className="text-stone-400 text-sm mt-1">
                      {trait.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-stone-400 text-sm mt-3">
              Selected: {selectedTraits.length}/2
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 text-red-100 px-4 py-3 border-2 border-red-900 rounded text-center">
              {error}
            </div>
          )}

        {/* Warning Banner */}
        <div className="bg-amber-900/30 border-2 border-amber-700 text-amber-200 px-4 py-3 rounded mb-6">
          <p className="font-semibold">⚠️ Warning:</p>
          <p className="text-sm mt-1">
            Editing your character will reset their adventure progress (HP, MP, GP, and location).
          </p>
        </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="font-washington flex-1 text-2xl bg-stone-700 hover:bg-red-800 active:bg-red-900 
                        text-stone-100 py-3 px-4 rounded
                        transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-lg hover:shadow-red-900/50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>

            <Link
              to="/characters"
              className="font-washington flex-1 text-2xl bg-stone-900 hover:bg-stone-800 
                        text-stone-300 py-3 px-4 rounded text-center no-underline
                        transition-all duration-300 border-2 border-stone-700"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
