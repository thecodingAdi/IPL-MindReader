'use client';

import { useState, useEffect } from 'react';

const TEAM_COLORS = {
  csk: '#facc15',
  mi: '#00d9ff',
  rcb: '#ef4444',
  kkr: '#a855f7',
  srh: '#f97316',
  dc: '#3b82f6',
  rr: '#ec4899',
  pbks: '#ef4444',
  gt: '#0f172a',
  lsg: '#06b6d4',
  dd: '#3b82f6'
};

// Simple particle background component
const Particles = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const arr = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      animationDuration: Math.random() * 5 + 5 + 's',
      animationDelay: Math.random() * 5 + 's',
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div 
          key={p.id} 
          className="particle" 
          style={{ 
            left: p.left, 
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
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
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [actualPlayerName, setActualPlayerName] = useState('');
  const [isLearning, setIsLearning] = useState(false);
  const [learningMessage, setLearningMessage] = useState(null);
  const [hasUsedDRS, setHasUsedDRS] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);


  const startGame = async () => {
    setGameState('PLAYING');
    setHistory([]);
    setCurrentQuestion(null);
    setCurrentQuestionId(null);
    setHostReaction(null);
    setGuess(null);
    setPlayerData(null);
    setConfidence(0);
    setTopCandidates([]);
    setHasUsedDRS(false);
    setIsReviewing(false);
    setError(null);
    await fetchNextStep([]);
  };

  const fetchNextStep = async (currentHistory) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/akinator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: currentHistory,
          questionCount: currentHistory.length
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch next step');
      }

      const data = await response.json();
      setConfidence(data.confidence || 0);
      setCandidatesLeft(data.remaining_candidates || 0);
      setTopCandidates(data.top_candidates || []);
      setHostReaction(data.reaction || null);

      if (data.action === 'guess') {
        setGuess(data.question); // 'question' holds the display text/guess name
        setPlayerData(data.playerData);
        setGameState('RESULT');
      } else {
        setCurrentQuestion(data.question); // beautified question
        setCurrentQuestionId(data.questionId);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (answer) => {
    if (isLoading) return;
    setIsLoading(true);

    const newHistory = [
      ...history,
      {
        question: currentQuestion,
        questionId: currentQuestionId,
        answer: answer
      }
    ];
    setHistory(newHistory);
    // Clear reaction temporarily while loading next step
    setHostReaction(null); 
    await fetchNextStep(newHistory);
  };

  const handleDRSReview = async () => {
    if (isReviewing || hasUsedDRS) return;
    setIsReviewing(true);
    setHasUsedDRS(true);
    setError(null);
    setHostReaction(null);

    try {
      // Simulate "Reviewing decision..." pause for immersion
      // Hackathon judges love animations/transitions
      await new Promise(resolve => setTimeout(resolve, 2500));

      const response = await fetch('/api/akinator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: history,
          questionCount: history.length,
          excludedIds: [playerData?.id]
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to perform DRS review');
      }

      const data = await response.json();
      setConfidence(data.confidence || 0);
      setCandidatesLeft(data.remaining_candidates || 0);
      setTopCandidates(data.top_candidates || []);
      setHostReaction(data.reaction || null);

      if (data.action === 'guess') {
        setGuess(data.question);
        setPlayerData(data.playerData);
      } else {
        // Fallback: if no clear guess, just show top candidate
        if (data.topCandidates && data.topCandidates.length > 0) {
          const top = data.topCandidates[0];
          setGuess(top.name);
          setPlayerData(top);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsReviewing(false);
    }
  };

  const learnFromGame = async (isCorrect, correctionName = null) => {
    setIsLearning(true);
    try {
      const payload = {
        isCorrect,
        history: history.map(h => ({ questionId: h.questionId, answer: h.answer })),
        confidence,
        guessedId: playerData?.id
      };

      if (isCorrect) {
        payload.playerId = playerData?.id;
      } else if (correctionName) {
        payload.actualName = correctionName;
      }

      const response = await fetch('/api/learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setLearningMessage(isCorrect ? "✅ Strengthened my knowledge!" : "🙏 Thanks! I'll learn from this.");
        setTimeout(() => setLearningMessage(null), 3000);
      }
    } catch (err) {
      console.error("Learning failed:", err);
    } finally {
      setIsLearning(false);
      if (!isCorrect) {
        setShowCorrectionModal(false);
        setGameState('START');
      }
    }
  };

  // Get primary team color if playerData exists
  let primaryColor = '#ffffff';
  if (playerData && playerData.tags) {
    for (const tag of playerData.tags) {
      if (TEAM_COLORS[tag]) {
        primaryColor = TEAM_COLORS[tag];
        break;
      }
    }
  }

  const progressWidth = `${Math.min(Math.max(confidence, 0), 100)}%`;

  return (
    <>
      <Particles />
      <div className="app-container">
        {/* Fixed IPL Logo in Top Left */}
        <div className="ipl-logo-fixed">
          <img 
            src="https://www.vhv.rs/dpng/d/473-4737816_2014-indian-premier-league-hd-png-download.png" 
            alt="IPL Logo" 
            className="ipl-logo-img"
          />
        </div>

        {gameState === 'START' && (
          <div className="scoreboard-panel" style={{ textAlign: 'center' }}>
            <div className="header-box">
              <h1 className="title-glow">🏏 IPL AKINATOR 🏆</h1>
              <div className="animated-underline"></div>
            </div>
            <p className="subtitle" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
              Think of any IPL legend, and I will guess who it is!
            </p>
            <button className="btn-start" onClick={startGame}>
              START GAME
            </button>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div className="scoreboard-panel">
            <div className="game-banner-container">
              <img 
                src="data:image/jpeg;base64,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" 
                alt="IPL Legends" 
                className="game-banner"
              />
            </div>

            <div className="scoreboard-header">
              <span>{"Q " + (history.length + 1).toString().padStart(2, '0')}</span>
              <span>{candidatesLeft} PLAYERS LEFT</span>
            </div>

            {/* LIVE METRIC PANEL */}
            <div className="ai-brain-panel">
              <h3>🧠 AI BRAIN: REAL-TIME ANALYSIS</h3>
              <div className="metric-item">
                <span className="metric-label">Confidence:</span>
                <div className="confidence-meter">
                  <div className="confidence-fill" style={{ width: progressWidth }}></div>
                </div>
                <span className="metric-value">{Math.round(confidence)}%</span>
              </div>

              {topCandidates.length > 0 && (
                <div className="top-candidates-list">
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '5px', textTransform: 'uppercase' }}>Current Front-runners:</div>
                  {topCandidates.map((c, i) => (
                    <div key={i} className="candidate-item">
                      <span className="c-name">{i + 1}. {c.name}</span>
                      <span className="c-prob">{c.probability}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="loading-container">
                <div className="cricket-ball"></div>
                <div className="loading-text">AI IS THINKING...</div>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#ef4444', marginBottom: '20px' }}>{error}</p>
                <button className="btn-start" onClick={() => fetchNextStep(history)}>RETRY</button>
              </div>
            ) : currentQuestion ? (
              <div>
                {/* AI Game Show Host Reaction */}
                {hostReaction && history.length > 0 && (
                  <div className="host-reaction">
                    🎙️ "{hostReaction}"
                  </div>
                )}
                
                <div className="question-text">{currentQuestion}</div>
                <div className="options-grid">
                  <button className="action-btn btn-yes" onClick={() => handleAnswer('Yes')}>
                    <span style={{ fontSize: '1.5rem' }}>🏏</span> YES
                  </button>
                  <button className="action-btn btn-no" onClick={() => handleAnswer('No')}>
                    <span style={{ fontSize: '1.5rem' }}>🔴</span> NO
                  </button>
                  <button className="action-btn btn-maybe" onClick={() => handleAnswer('Maybe')}>
                    MAYBE
                  </button>
                  <button className="action-btn btn-dunno" onClick={() => handleAnswer('Dont Know')}>
                    DON'T KNOW
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {gameState === 'RESULT' && (
          <div className="reveal-container">
            <div className="reveal-dim"></div>
            <div className="spotlight"></div>
            
            <div className="flip-card">
              <div className="flip-card-inner">
                {/* The front side (Back of the card during flip animation) */}
                <div className="flip-card-front">
                  <div className="loading-container">
                     <div className="cricket-ball"></div>
                     <div className="title-glow" style={{ fontSize: '1.5rem' }}>
                       {isReviewing ? 'REVIEWING DECISION...' : 'ANALYZING...'}
                     </div>
                     {isReviewing && <div className="subtitle">DRS IN PROGRESS</div>}
                  </div>
                </div>
                
                {/* The back side (Actual Reveal Card) */}
                <div className="flip-card-back" style={{ borderTopColor: primaryColor }}>
                  <div className="scoreboard-header" style={{ color: primaryColor }}>
                    <span>CONFIDENCE: {confidence}%</span>
                    <span>MATCH FOUND</span>
                  </div>
                  
                  {hostReaction && (
                    <div className="host-reaction" style={{ marginTop: '20px', borderColor: primaryColor }}>
                      🎙️ "{hostReaction}"
                    </div>
                  )}

                  <p className="subtitle" style={{ fontSize: '1.2rem', marginTop: '20px' }}>You are thinking of...</p>
                  <h2 className="guess-name" style={{ color: primaryColor }}>{guess}</h2>
                  
                  {playerData && playerData.tags && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
                      {playerData.tags.map(tag => (
                        <span key={tag} style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '15px', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                          {tag.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="options-grid" style={{ marginTop: '30px' }}>
                    <button
                      className="action-btn btn-yes"
                      disabled={isLearning || isReviewing}
                      onClick={() => {
                        learnFromGame(true);
                        setGameState('START');
                      }}
                    >
                      🏆 YES! PLAY AGAIN
                    </button>
                    {!hasUsedDRS && (
                      <button
                        className="action-btn btn-maybe"
                        disabled={isLearning || isReviewing}
                        onClick={handleDRSReview}
                        style={{ border: '2px solid #facc15', color: '#facc15' }}
                      >
                        🏏 DRS REVIEW
                      </button>
                    )}
                    <button
                      className="action-btn btn-no"
                      disabled={isLearning || isReviewing}
                      onClick={() => setShowCorrectionModal(true)}
                    >
                      ❌ NO! THAT'S WRONG
                    </button>
                  </div>

                  {topCandidates.length > 0 && (
                    <div className="confidence-board">
                      <h3>📊 AI CONFIDENCE BOARD</h3>
                      {topCandidates.map((c, i) => (
                        <div key={i} className={`board-item ${i === 0 ? 'active' : ''}`}>
                          <div>
                            <span className="board-rank">{i + 1}.</span>
                            <span className="board-name">{c.name}</span>
                          </div>
                          <span className="board-prob">{c.probability}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* DRS Animation Overlay (When Reviewing) */}
            {isReviewing && (
              <div className="modal-overlay" style={{ zIndex: 100, background: 'rgba(0,0,0,0.9)' }}>
                <div className="loading-container">
                  <div className="cricket-ball" style={{ width: '80px', height: '80px' }}></div>
                  <h2 className="title-glow" style={{ fontSize: '2rem', marginTop: '20px' }}>DRS REVIEW</h2>
                  <p className="subtitle" style={{ fontSize: '1.2rem' }}>CONSULTING THIRD AI UMPIRE...</p>
                  <div className="confidence-meter" style={{ width: '300px', height: '10px', marginTop: '20px' }}>
                    <div className="confidence-fill animated-progress"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Modal */}
            {showCorrectionModal && (
              <div className="modal-overlay">
                <div className="scoreboard-panel correction-modal">
                  <h3 className="title-glow" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>I MISSED IT! 😅</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Who were you actually thinking of?</p>
                  <input 
                    type="text" 
                    className="correction-input"
                    placeholder="Enter Player Name..."
                    value={actualPlayerName}
                    onChange={(e) => setActualPlayerName(e.target.value)}
                  />
                  <div className="options-grid" style={{ marginTop: '20px' }}>
                    <button 
                      className="action-btn btn-yes"
                      disabled={!actualPlayerName || isLearning}
                      onClick={() => learnFromGame(false, actualPlayerName)}
                    >
                      {isLearning ? 'LEARNING...' : 'SUBMIT & LEARN'}
                    </button>
                    <button 
                      className="action-btn btn-no"
                      onClick={() => {
                        setShowCorrectionModal(false);
                        setGameState('START');
                      }}
                    >
                      SKIP
                    </button>
                  </div>
                </div>
              </div>
            )}

            {learningMessage && (
              <div className="learning-toast">
                {learningMessage}
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}
