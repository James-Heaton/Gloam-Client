import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';

export default function GameOverModal() {
  const { showGameOver, gameOverType, gameState, handleResetGame, outcomeData } = useContext(GameContext);
  const navigate = useNavigate();

  if (!showGameOver || !gameState) {
    return null;
  }

  const isVictory = gameOverType === 'victory';
  const finalGP = outcomeData?.final_gp ?? 0;

  const handleTryAgain = () => {
    handleResetGame(gameState.character_stats.id);
  };

  const handleReturnToCharacters = () => {
    navigate('/characters');
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className={`bg-black/50 border-4 rounded-lg p-8 max-w-2xl w-full shadow-2xl ${isVictory ? 'border-amber-500 shadow-amber-500/50' : 'border-red-800 shadow-red-800/50'}`}>
        <h2 className={`font-washington text-5xl font-bold mb-10 text-center ${isVictory ? 'text-amber-500' : 'text-red-700'}`}>
          {isVictory ? 'Victory!' : 'Defeat'}
        </h2>
        
        {isVictory ? (
          <div>
            <p className="text-2xl text-stone-200 mb-6 leading-relaxed text-center">
              Congratulations! You survived Gloam: The Winding Path. The castle holds many secrets and paths you have not yet discovered. Do you dare to walk The Winding Path again?
            </p>
            <p className="font-washington text-amber-500 text-3xl mb-8 text-center text-shadow-lg shadow-amber-500/50">
              Total Treasure: {finalGP} GP
            </p>
          </div>
        ) : (
          <div>
            <p className="text-2xl text-stone-200 mb-6 leading-relaxed text-center">
              Your journey ends here. The castle has claimed another soul.
            </p>
            <p className="font-washington text-amber-500 text-3xl mb-8 text-center">
              Total Treasure: {finalGP} GP
            </p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleTryAgain}
            className="font-washington w-full text-2xl bg-stone-700 hover:bg-red-800 text-stone-100 py-4 rounded 
                      transition-all duration-300 shadow-lg hover:shadow-red-900/50"
          >
            {isVictory ? 'New Adventure' : 'Try Again'}
          </button>
          
          <button
            onClick={handleReturnToCharacters}
            className="font-washington w-full text-2xl bg-stone-900 hover:bg-stone-800 text-stone-300 py-4 rounded 
                      transition-all duration-300 border-2 border-stone-700"
          >
            Return to Characters
          </button>
        </div>
      </div>
    </div>
  );
}