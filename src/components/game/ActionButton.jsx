import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export default function ActionButton({ action, onExecute, disabled }) {
  const { gameState } = useContext(GameContext)
  const showMpCost = action.mp_cost > 0;
  const insufficientMp = action.mp_cost > gameState.character_stats.mp;
  const isDisabled = disabled || insufficientMp;

  return (
    <button
      onClick={() => onExecute(action.id)}
      disabled={isDisabled}
      className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white p-4 rounded text-left transition-colors"
    >
      <p className="font-semibold mb-1">{action.action_text}</p>
      
      {showMpCost && (
        <p className="text-sm text-blue-300">
          Costs {action.mp_cost} MP
          {insufficientMp && <span className="text-red-400"> (Insufficient MP)</span>}
        </p>
      )}
    </button>
  );
}
