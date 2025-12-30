export default function StealthyButton({ usesRemaining, onUseStealthy, disabled }) {
  return (
    <div className="mb-4">
      <button
        onClick={onUseStealthy}
        disabled={disabled}
        className="w-full bg-purple-700 hover:bg-purple-600 disabled:bg-gray-800 disabled:text-gray-500 text-white p-4 rounded transition-colors"
      >
        <p className="font-semibold mb-1">Use Stealthy Trait ({usesRemaining} uses remaining)</p>
        <p className="text-sm text-purple-200">Find the safest passage through the area avoiding detection and harm</p>
      </button>
    </div>
  );
}