'use client';

export default function ConfidenceBoard({ topCandidates, active = false }) {
  if (!topCandidates || topCandidates.length === 0) return null;

  return (
    <div className={`confidence-board ${active ? 'active' : ''}`} style={{ marginTop: '30px', width: '100%' }}>
      <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px', textAlign: 'center', letterSpacing: '1px' }}>
        📊 AI CONFIDENCE BOARD
      </h3>
      {topCandidates.map((c, i) => (
        <div key={i} className={`board-item ${i === 0 ? 'active' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="board-rank">{i + 1}.</span>
            <span className="board-name" style={{ fontWeight: i === 0 ? '700' : '400' }}>{c.name}</span>
          </div>
          <span className="board-prob">{c.probability}%</span>
        </div>
      ))}
    </div>
  );
}
