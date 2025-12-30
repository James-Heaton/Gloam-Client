import { useContext, useEffect } from 'react';
import { GameContext } from '../../context/GameContext';
import { AuthContext } from '../../context/AuthContext';
import AreaDisplay from './AreaDisplay';
import CharacterStatsPanel from './CharacterStatsPanel';
import ActionList from './ActionList';
import StealthyButton from './StealthyButton';
import OutcomeModal from './OutcomeModal';
import GameOverModal from './GameOverModal';

export default function GamePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const { gameState, loading, error, showGameOver, loadGameState, handleExecuteAction } = useContext(GameContext);

  useEffect(() => {
    if (isAuthenticated) {
      loadGameState();
    }
  }, [isAuthenticated]);

    const handleUseStealthy = () => {
    handleExecuteAction(null, true);
    };

  if (loading && !gameState) {
    return <div className="text-white text-center mt-10">Loading game...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  if (!gameState) {
    return <div className="text-white text-center mt-10">No active game found.</div>;
  }

  // Show only game over modal if game is over
    if (showGameOver) {
        return (
            <div className="min-h-screen bg-gray-900 p-6">
                <GameOverModal />
            </div>
        );
    }
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Character Stats - Left Column */}
          <div className="md:col-span-1">
            <CharacterStatsPanel character={gameState.character_stats} />
          </div>

          {/* Main Game Area - Right Column */}
          <div className="md:col-span-2 space-y-6">
            <AreaDisplay area={gameState.area} />
            <ActionList
              actions={gameState.area.actions}
              onExecuteAction={handleExecuteAction}
              disabled={loading}
            />
            
            {gameState.can_use_stealthy && (
            <StealthyButton 
                usesRemaining={3 - gameState.character_stats.stealthy_used}
                onUseStealthy={handleUseStealthy}
                disabled={loading}
            />
            )}
          </div>
        </div>
      </div>

      <OutcomeModal />
    </div>
  );
}