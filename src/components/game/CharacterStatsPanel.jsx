import { Link } from "react-router-dom";
import { useState } from "react";

export default function CharacterStatsPanel({ character }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-black/50 border-4 border-stone-700 rounded-lg p-6 shadow-2xl">
      {/* Mobile Header - Always Visible */}
      <div className="flex items-center justify-between lg:block">
        <div className="flex-1">
          <Link to="/characters" className="no-underline inline-block">
            <h2 className="font-washington text-3xl text-stone-300 no-underline hover:text-red-800 transition-colors duration-300 mb-2">
              {character.name}
            </h2>
          </Link>   
          <p className="font-washington text-xl text-stone-400 mb-2 lg:mb-6">{character.character_type_name}</p>
        </div>

        {/* Burger Menu - Mobile Only */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden text-stone-300 text-4xl ml-4 hover:text-red-800 transition-all duration-300"
        >
          ☰
        </button>
      </div>

      {/* Stats - Collapsible on Mobile, Always Visible on Desktop */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="space-y-4 mb-6 mt-4 lg:mt-0">
          <div className="flex justify-between items-center pb-2 border-b-2 border-stone-700">
            <span className="font-washington text-stone-400 text-xl">Health:</span>
            <span className="text-stone-100 font-bold text-xl">{character.hp}/{character.max_hp} HP</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b-2 border-stone-700">
            <span className="font-washington text-stone-400 text-xl">Magic:</span>
            <span className="text-stone-100 font-bold text-xl">{character.mp}/{character.max_mp} MP</span>
          </div>
          
          <div className="flex justify-between items-center pb-2 border-b-2 border-stone-700">
            <span className="font-washington text-stone-400 text-xl">Treasure:</span>
            <span className="text-amber-500 font-bold text-xl">{character.gp} GP</span>
          </div>
        </div>

        <div>
          <p className="font-washington text-stone-400 text-xl mb-2">Traits:</p>
          <p className="font-washington text-stone-200 text-2xl">
            {character.traits.map(t => t.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}
