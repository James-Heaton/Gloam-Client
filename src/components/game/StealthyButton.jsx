export default function StealthyButton({
  usesRemaining,
  onUseStealthy,
  disabled,
}) {
  return (
    <div className="mb-4 -mt-3">
      <button
        onClick={onUseStealthy}
        disabled={disabled}
        className="w-full bg-purple-700/50 hover:bg-purple-600/50 disabled:bg-gray-800 disabled:text-gray-500 text-white p-3 rounded transition-all duration-300 shadow-lg hover:shadow-purple-900/50"
      >
        <p className="text-xl mb-1">
          Use Stealthy Trait ({usesRemaining} uses remaining)
        </p>
        <p className="text-sm text-purple-200">
          Find the safest passage through the area avoiding detection and harm
        </p>
      </button>
    </div>
  );
}
