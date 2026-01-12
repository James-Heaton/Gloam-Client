import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export default function ActionButton({ action, onExecute, disabled }) {
  const { gameState } = useContext(GameContext);
  const showMpCost = action.mp_cost > 0;
  const insufficientMp = action.mp_cost > gameState.character_stats.mp;
  const isDisabled = disabled || insufficientMp;

  return (
    <button
      onClick={() => onExecute(action.id)}
      disabled={isDisabled}
      className={`w-full p-3 rounded-lg text-left transition-all duration-300 border-2
        ${isDisabled 
          ? 'bg-stone-900/50 border-stone-800 text-stone-600 cursor-not-allowed' 
          : 'bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-700 hover:border-stone-600 hover:shadow-lg hover:shadow-stone-900/50'
        }`}
    >
      <p className="text-xl">
        {action.action_text}
      </p>
      
      {showMpCost && (
        <p className="text-lg mt-2 font-bold">
          <span className={insufficientMp ? 'text-red-700' : 'text-blue-400'}>
            Costs {action.mp_cost} MP
          </span>
          {insufficientMp && <span className="text-red-700 ml-2">(Insufficient MP)</span>}
        </p>
      )}
    </button>
  );
}
