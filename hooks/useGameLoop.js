import { useState, useCallback } from 'react';

/**
 * Custom hook to manage the IPL MindReader gameplay loop
 */
export function useGameLoop() {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, RESULT
  const [history, setHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [hostReaction, setHostReaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [guess, setGuess] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [candidatesLeft, setCandidatesLeft] = useState(0);
  const [topCandidates, setTopCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [hasUsedDRS, setHasUsedDRS] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  const fetchNextStep = useCallback(async (currentHistory, excludedIds = []) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/akinator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: currentHistory,
          questionCount: currentHistory.length,
          excludedIds
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch next step');
      }

      const data = await response.json();
      setConfidence(data.confidence || 0);
      setCandidatesLeft(data.remaining_candidates || 0);
      setTopCandidates(data.topCandidates || []);
      setHostReaction(data.reaction || null);

      if (data.action === 'guess') {
        setGuess(data.question);
        setPlayerData(data.playerData);
        setGameState('RESULT');
      } else {
        setCurrentQuestion(data.question);
        setCurrentQuestionId(data.questionId);
        setGameState('PLAYING');
      }
    } catch (err) {
      console.error("Game Loop Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startGame = async () => {
    setHistory([]);
    setGuess(null);
    setPlayerData(null);
    setConfidence(0);
    setHasUsedDRS(false);
    setIsReviewing(false);
    setError(null);
    setHostReaction(null);
    await fetchNextStep([]);
  };

  const handleAnswer = async (answer) => {
    if (isLoading) return;

    const newHistory = [
      ...history,
      {
        question: currentQuestion,
        questionId: currentQuestionId,
        answer: answer
      }
    ];
    setHistory(newHistory);
    setHostReaction(null); 
    await fetchNextStep(newHistory);
  };

  const handleDRSReview = async () => {
    if (isReviewing || hasUsedDRS) return;
    setIsReviewing(true);
    setHasUsedDRS(true);
    
    // Aesthetic pause for immersion
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await fetchNextStep(history, [playerData?.id]);
    setIsReviewing(false);
  };

  const resetToStart = () => {
    setGameState('START');
    setError(null);
  };

  return {
    gameState,
    history,
    currentQuestion,
    hostReaction,
    isLoading,
    guess,
    playerData,
    confidence,
    candidatesLeft,
    topCandidates,
    error,
    hasUsedDRS,
    isReviewing,
    startGame,
    handleAnswer,
    handleDRSReview,
    resetToStart,
    fetchNextStep // Expose for retries
  };
}
