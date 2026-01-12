import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

export default function OutcomeModal() {
  const { outcomeData, showOutcome, handleContinue } = useContext(GameContext);

  if (!showOutcome || !outcomeData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-black/95 border-4 border-stone-700 rounded-lg p-8 max-w-2xl w-full shadow-2xl">
        
        {/* Lucky feedback BEFORE outcome */}
        {outcomeData.lucky_procced && (
          <p className="font-washington text-xl text-amber-500 mb-6 text-center italic">
            You feel lucky about your choice...
          </p>
        )}
        
        {/* Main outcome text */}
        <p className="text-xl text-stone-200 mb-6 leading-relaxed whitespace-pre-line text-center">
          {outcomeData.outcome_text}
        </p>

        {/* Strong feedback AFTER outcome (if damage was negated) */}
        {outcomeData.strong_procced && (
          <p className="font-washington text-xl text-red-400 mb-6 text-center italic">
            Your strength has absorbed some harm.
          </p>
        )}
        
        {/* Wise feedback AFTER outcome (if MP cost was negated) */}
        {outcomeData.wise_procced && (
          <p className="font-washington text-xl text-blue-400 mb-6 text-center italic">
            Your wisdom has reduced the cost of magic.
          </p>
        )}

        {/* Stat Changes */}
        {(outcomeData.stat_changes.hp !== 0 || outcomeData.stat_changes.mp !== 0 || outcomeData.stat_changes.gp !== 0) && (
          <div className="bg-stone-900/60 border-2 border-stone-700 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              {outcomeData.stat_changes.hp !== 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-washington text-stone-400 text-2xl">Health:</span>
                  <span className={`text-xl font-bold ${outcomeData.stat_changes.hp > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {outcomeData.stat_changes.hp > 0 ? '+' : ''}{outcomeData.stat_changes.hp} HP
                  </span>
                </div>
              )}
              {outcomeData.stat_changes.mp !== 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-washington text-stone-400 text-2xl">Magic:</span>
                  <span className={`text-xl font-bold ${outcomeData.stat_changes.mp > 0 ? 'text-blue-400' : 'text-blue-300'}`}>
                    {outcomeData.stat_changes.mp > 0 ? '+' : ''}{outcomeData.stat_changes.mp} MP
                  </span>
                </div>
              )}
              {outcomeData.stat_changes.gp !== 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-washington text-stone-400 text-2xl">Gold:</span>
                  <span className="text-xl font-bold text-amber-500">
                    {outcomeData.stat_changes.gp > 0 ? '+' : ''}{outcomeData.stat_changes.gp} GP
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={handleContinue}
          className="font-washington w-full text-2xl bg-stone-700 hover:bg-red-800 text-stone-100 py-4 rounded 
                    transition-all duration-300 shadow-lg hover:shadow-red-900/50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
