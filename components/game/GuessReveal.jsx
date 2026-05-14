'use client';

import ConfidenceBoard from './ConfidenceBoard';
import { TEAM_COLORS } from '../../lib/constants';

export default function GuessReveal({ 
  guess, 
  playerData, 
  confidence, 
  topCandidates, 
  hostReaction,
  onPlayAgain,
  onDRS,
  onWrong,
  isReviewing,
  hasUsedDRS
}) {
  // Get primary team color
  let primaryColor = '#ffffff';
  if (playerData?.tags) {
    for (const tag of playerData.tags) {
      const lowerTag = tag.toLowerCase();
      if (TEAM_COLORS[lowerTag]) {
        primaryColor = TEAM_COLORS[lowerTag];
        break;
      }
    }
  }

  return (
    <div className="reveal-container">
      <div className="reveal-dim"></div>
      <div className="spotlight"></div>
      
      <div className={`flip-card ${isReviewing ? '' : 'flipped'}`}>
        <div className="flip-card-inner">
          {/* Front: Loading State during flip or review */}
          <div className="flip-card-front">
             <div className="loading-container">
                <div className="cricket-ball"></div>
                <div className="title-glow" style={{ fontSize: '1.5rem', marginTop: '20px' }}>ANALYZING DATA...</div>
             </div>
          </div>
          
          {/* Back: The Actual Reveal */}
          <div className="flip-card-back" style={{ borderTop: `6px solid ${primaryColor}` }}>
            <div className="scoreboard-header" style={{ color: primaryColor, marginBottom: '10px' }}>
              <span>CONFIDENCE: {confidence}%</span>
              <span>MATCH FOUND</span>
            </div>
            
            {hostReaction && (
              <div className="host-reaction" style={{ borderColor: primaryColor, background: 'rgba(255,255,255,0.03)', marginBottom: '20px' }}>
                🎙️ "{hostReaction}"
              </div>
            )}

            <p className="subtitle" style={{ fontSize: '1.1rem', opacity: 0.7 }}>I'm fairly certain it's...</p>
            <h2 className="guess-name" style={{ color: primaryColor, fontSize: '3.5rem', margin: '10px 0' }}>{guess}</h2>
            
            {playerData?.tags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '25px' }}>
                {playerData.tags.map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
            )}

            <div className="options-grid" style={{ marginTop: '20px' }}>
              <button className="action-btn btn-yes" onClick={onPlayAgain}>
                🏆 YES! ACCURATE
              </button>
              {!hasUsedDRS && (
                <button className="action-btn btn-maybe" onClick={onDRS} style={{ border: '2px solid #facc15', color: '#facc15' }}>
                  🏏 DRS REVIEW
                </button>
              )}
              <button className="action-btn btn-no" onClick={onWrong}>
                ❌ NO, THAT'S WRONG
              </button>
            </div>

            <ConfidenceBoard topCandidates={topCandidates} />
          </div>
        </div>
      </div>
    </div>
  );
}
