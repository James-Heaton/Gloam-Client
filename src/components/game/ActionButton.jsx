export default function ActionButton({ action, onExecute, disabled }) {
  const showMpCost = action.mp_cost > 0;

  return (
    <button
      onClick={() => onExecute(action.id)}
      disabled={disabled}
      className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white p-4 rounded text-left transition-colors"
    >
      <p className="font-semibold mb-1">{action.action_text}</p>
      
      {showMpCost && (
        <p className="text-sm text-blue-300">Costs {action.mp_cost} MP</p>
      )}
    </button>
  );
}
