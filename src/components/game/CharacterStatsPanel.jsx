import { Link } from "react-router-dom";

export default function CharacterStatsPanel({ character }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded">
        <Link to="/characters">
            <h2 className="text-xl font-bold mb-2">{character.name}</h2>
        </Link>   
      <p className="text-sm text-gray-400 mb-4">{character.character_type_name}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Health:</span>
          <span className="font-bold">{character.hp}/{character.max_hp} HP</span>
        </div>
        
        <div className="flex justify-between">
          <span>Magic:</span>
          <span className="font-bold">{character.mp}/{character.max_mp} MP</span>
        </div>
        
        <div className="flex justify-between">
          <span>Gold:</span>
          <span className="font-bold">{character.gp} GP</span>
        </div>
      </div>

      <div className="flex justify-between">
        <span className="text-sm font-semibold mb-2">Traits:</span>
        <span>
            {character.traits.map(t => t.name).join(', ')}
        </span>
          
      </div>
    </div>
  );
}
