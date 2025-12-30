import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

export default function OutcomeModal() {
  const { outcomeData, showOutcome, handleContinue } = useContext(GameContext);

  if (!showOutcome || !outcomeData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gray-800 text-white p-6 rounded max-w-lg w-full">
        {/* <h2 className="text-xl font-bold mb-4">Outcome</h2> */}
        
        {/* Lucky feedback BEFORE outcome */}
        {outcomeData.lucky_procced && (
          <p className="text-yellow-400 mb-4">You feel lucky about your choice...</p>
        )}
        
        {/* Main outcome text */}
        <p className="text-gray-300 mb-4 whitespace-pre-line">
          {outcomeData.outcome_text}
        </p>

        {/* Strong feedback AFTER outcome (if damage was negated) */}
        {outcomeData.strong_procced && (
          <p className="text-red-400 mb-2">Your strength has absorbed harm.</p>
        )}
        
        {/* Wise feedback AFTER outcome (if MP cost was negated) */}
        {outcomeData.wise_procced && (
          <p className="text-blue-400 mb-2">Your wisdom has reduced the cost of magic.</p>
        )}

        {/* Stat Changes */}
        <div className="mb-4 space-y-1">
          {outcomeData.stat_changes.hp !== 0 && (
            <p className={outcomeData.stat_changes.hp > 0 ? 'text-green-400' : 'text-red-400'}>
              HP: {outcomeData.stat_changes.hp > 0 ? '+' : ''}{outcomeData.stat_changes.hp}
            </p>
          )}
          {outcomeData.stat_changes.mp !== 0 && (
            <p className={outcomeData.stat_changes.mp > 0 ? 'text-blue-400' : 'text-blue-300'}>
              MP: {outcomeData.stat_changes.mp > 0 ? '+' : ''}{outcomeData.stat_changes.mp}
            </p>
          )}
          {outcomeData.stat_changes.gp !== 0 && (
            <p className="text-yellow-400">
              GP: {outcomeData.stat_changes.gp > 0 ? '+' : ''}{outcomeData.stat_changes.gp}
            </p>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
