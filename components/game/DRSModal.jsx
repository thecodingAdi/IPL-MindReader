'use client';

import StadiumLoader from '../ui/StadiumLoader';

export default function DRSModal({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 100, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}>
      <div className="loading-container">
        <div className="cricket-ball" style={{ width: '100px', height: '100px', border: '4px solid #facc15', boxShadow: '0 0 30px rgba(250, 204, 21, 0.4)' }}></div>
        <h2 className="title-glow" style={{ fontSize: '2.5rem', marginTop: '30px', color: '#facc15' }}>DRS REVIEW</h2>
        <p className="subtitle" style={{ fontSize: '1.4rem', letterSpacing: '2px', color: '#fff' }}>CONSULTING THIRD AI UMPIRE...</p>
        
        <div className="confidence-meter" style={{ width: '350px', height: '12px', marginTop: '30px', background: 'rgba(255,255,255,0.1)' }}>
          <div className="confidence-fill animated-progress" style={{ background: 'linear-gradient(90deg, #facc15, #f59e0b)' }}></div>
        </div>
        
        <div style={{ marginTop: '40px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '4px' }}>
          Searching for trajectory anomalies...
        </div>
      </div>
    </div>
  );
}
