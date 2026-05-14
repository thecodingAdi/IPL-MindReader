'use client';

import { useState } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import ErrorBoundary from '../components/ErrorBoundary';
import Particles from '../components/ui/Particles';
import QuestionCard from '../components/game/QuestionCard';
import GuessReveal from '../components/game/GuessReveal';
import DRSModal from '../components/game/DRSModal';

export default function Home() {
  const {
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
    fetchNextStep
  } = useGameLoop();

  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [actualPlayerName, setActualPlayerName] = useState('');
  const [isLearning, setIsLearning] = useState(false);

  const handleLearn = async (isCorrect, correctionName = null) => {
    setIsLearning(true);
    try {
      const payload = {
        isCorrect,
        history: history.map(h => ({ questionId: h.questionId, answer: h.answer })),
        confidence,
        guessedId: playerData?.id,
        ...(isCorrect ? { playerId: playerData?.id } : { actualName: correctionName })
      };

      await fetch('/api/learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Learning failed:", err);
    } finally {
      setIsLearning(false);
      setShowCorrectionModal(false);
      resetToStart();
    }
  };

  return (
    <ErrorBoundary>
      <Particles />
      <div className="app-container">
        {/* Fixed IPL Logo */}
        <div className="ipl-logo-fixed">
          <img 
            src="https://www.vhv.rs/dpng/d/473-4737816_2014-indian-premier-league-hd-png-download.png" 
            alt="IPL Logo" 
            className="ipl-logo-img"
          />
        </div>

        {gameState === 'START' && (
          <div className="scoreboard-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="header-box">
              <h1 className="title-glow">🏏 IPL AKINATOR 🏆</h1>
              <div className="animated-underline"></div>
            </div>
            <p className="subtitle" style={{ fontSize: '1.3rem', margin: '30px 0 50px' }}>
              Think of any IPL legend, and I will read your mind!
            </p>
            <button className="btn-start" onClick={startGame}>
              ENTER THE STADIUM
            </button>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <QuestionCard 
            question={currentQuestion}
            reaction={hostReaction}
            onAnswer={handleAnswer}
            isLoading={isLoading}
            questionNumber={history.length + 1}
            candidatesLeft={candidatesLeft}
            confidence={confidence}
            topCandidates={topCandidates}
            error={error}
            onRetry={() => fetchNextStep(history)}
          />
        )}

        {gameState === 'RESULT' && (
          <GuessReveal 
            guess={guess}
            playerData={playerData}
            confidence={confidence}
            topCandidates={topCandidates}
            hostReaction={hostReaction}
            isReviewing={isReviewing}
            hasUsedDRS={hasUsedDRS}
            onPlayAgain={() => handleLearn(true)}
            onDRS={handleDRSReview}
            onWrong={() => setShowCorrectionModal(true)}
          />
        )}

        <DRSModal isOpen={isReviewing} />

        {/* Global Error Banner (Only if not in START state) */}
        {error && gameState !== 'START' && !isLoading && (
          <div className="learning-toast" style={{ background: '#ef4444', bottom: '20px' }}>
             ⚠️ {error}
             <button onClick={() => fetchNextStep(history)} style={{ marginLeft: '15px', color: '#fff', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>RETRY</button>
          </div>
        )}

        {/* Correction Modal */}
        {showCorrectionModal && (
          <div className="modal-overlay" style={{ zIndex: 200 }}>
            <div className="scoreboard-panel correction-modal" style={{ maxWidth: '400px' }}>
              <h3 className="title-glow" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>I MISSED IT! 😅</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Who were you actually thinking of?</p>
              <input 
                type="text" 
                className="correction-input"
                placeholder="Enter Player Name..."
                value={actualPlayerName}
                onChange={(e) => setActualPlayerName(e.target.value)}
                autoFocus
              />
              <div className="options-grid" style={{ marginTop: '25px' }}>
                <button 
                  className="action-btn btn-yes"
                  disabled={!actualPlayerName || isLearning}
                  onClick={() => handleLearn(false, actualPlayerName)}
                >
                  {isLearning ? 'LEARNING...' : 'SUBMIT & LEARN'}
                </button>
                <button 
                  className="action-btn btn-no"
                  onClick={() => {
                    setShowCorrectionModal(false);
                    resetToStart();
                  }}
                >
                  SKIP
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
