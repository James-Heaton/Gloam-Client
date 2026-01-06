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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gray-800 text-white p-6 rounded max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">
          {isVictory ? 'Victory!' : 'Defeat'}
        </h2>
        
        {isVictory ? (
          <div>
            <p className="text-gray-300 mb-4">
              Congratulations! You survived Gloam: The Winding Path. The castle holds many secrets and paths you have not yet discovered. Do you dare to walk The Winding Path again?
            </p>
            <p className="text-yellow-400 text-xl mb-6">
              Final Gold: {finalGP} GP
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-300 mb-4">
              Your journey ends here. The castle has claimed another soul.
            </p>
            <p className="text-yellow-400 text-xl mb-6">
              Gold Collected: {finalGP} GP
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded"
          >
            {isVictory ? 'New Game' : 'Try Again'}
          </button>
          
          <button
            onClick={handleReturnToCharacters}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
          >
            Return to Characters
          </button>
        </div>
      </div>
    </div>
  );
}
