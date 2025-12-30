import { useState } from 'react';
import { getGameState, executeAction, resetGame } from '../services/api';
import { GameContext } from './GameContext';

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [outcomeData, setOutcomeData] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameOverType, setGameOverType] = useState(null); // 'victory' or 'defeat'

  const loadGameState = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGameState();
      setGameState(data);
    } catch (err) {
      setError(err.message || 'Failed to load game state');
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteAction = async (actionId, useStealthy = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await executeAction(actionId, useStealthy);
      setOutcomeData(result);
      setShowOutcome(true);
    } catch (err) {
      setError(err.message || 'Failed to execute action');
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    setShowOutcome(false);
    
    // Check for game over conditions
    if (outcomeData.game_status === 'victory') {
      setGameOverType('victory');
      setShowGameOver(true);
    } else if (outcomeData.game_status === 'defeat') {
      setGameOverType('defeat');
      setShowGameOver(true);
    } else {
      // Normal continuation - reload game state
      await loadGameState();
    }
    
    setLoading(false);
  };

  const handleResetGame = async (characterId) => {
    setLoading(true);
    setError(null);
    try {
      await resetGame(characterId);
      setShowGameOver(false);
      setGameOverType(null);
      await loadGameState();
    } catch (err) {
      setError(err.message || 'Failed to reset game');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    gameState,
    loading,
    error,
    outcomeData,
    showOutcome,
    showGameOver,
    gameOverType,
    loadGameState,
    handleExecuteAction,
    handleContinue,
    handleResetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
