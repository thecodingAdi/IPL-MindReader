'use client';

import StadiumLoader from '../ui/StadiumLoader';

export default function QuestionCard({ 
  question, 
  reaction, 
  onAnswer, 
  isLoading, 
  questionNumber,
  candidatesLeft,
  confidence,
  topCandidates
}) {
  const progressWidth = `${Math.min(Math.max(confidence, 0), 100)}%`;

  return (
    <div className="scoreboard-panel">
      <div className="scoreboard-header">
        <span>{"Q " + questionNumber.toString().padStart(2, '0')}</span>
        <span>{candidatesLeft} PLAYERS LEFT</span>
      </div>

      {/* AI Brain Live Analysis */}
      <div className="ai-brain-panel">
        <h3 style={{ fontSize: '0.8rem', color: '#60a5fa', marginBottom: '10px' }}>🧠 REAL-TIME ANALYSIS</h3>
        <div className="metric-item">
          <span className="metric-label">AI Confidence:</span>
          <div className="confidence-meter" style={{ flex: 1, margin: '0 15px' }}>
            <div className="confidence-fill" style={{ width: progressWidth }}></div>
          </div>
          <span className="metric-value" style={{ width: '40px', textAlign: 'right' }}>{Math.round(confidence)}%</span>
        </div>
        
        {topCandidates && topCandidates.length > 0 && (
          <div style={{ marginTop: '15px' }}>
             <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>Current Front-runners:</div>
             {topCandidates.slice(0, 2).map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                   <span>{i+1}. {c.name}</span>
                   <span style={{ color: '#60a5fa' }}>{c.probability}%</span>
                </div>
             ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <StadiumLoader text="AI IS ANALYZING..." />
      ) : (
        <>
          {reaction && (
            <div className="host-reaction" style={{ animation: 'fadeIn 0.5s ease-out' }}>
              🎙️ "{reaction}"
            </div>
          )}
          
          <div className="question-text" style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {question}
          </div>

          <div className="options-grid">
            <button className="action-btn btn-yes" onClick={() => onAnswer('Yes')}>
              <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🏏</span> YES
            </button>
            <button className="action-btn btn-no" onClick={() => onAnswer('No')}>
              <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🔴</span> NO
            </button>
            <button className="action-btn btn-maybe" onClick={() => onAnswer('Maybe')}>
              MAYBE
            </button>
            <button className="action-btn btn-dunno" onClick={() => onAnswer('Dont Know')}>
              DON'T KNOW
            </button>
          </div>
        </>
      )}
    </div>
  );
}
