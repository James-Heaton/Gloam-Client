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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-stone-300">Loading game...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fadeIn flex justify-center items-center min-h-screen">
        <div className="font-washington text-3xl text-red-700">{error}</div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="animate-fadeIn flex justify-center items-center min-h-screen">
        <div className="font-washington text-3xl text-stone-300">No active game found.</div>
      </div>
    );
  }

  if (showGameOver) {
    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <GameOverModal />
      </div>
    );
  }

  return (
    <div className="animate-fadeIn min-h-screen pt-40 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Character Stats - Left Column */}
          <div className="lg:col-span-1">
            <CharacterStatsPanel character={gameState.character_stats} />
          </div>

          {/* Main Game Area - Right Column */}
          <div className="lg:col-span-3 space-y-6">
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
