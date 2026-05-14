'use client';

export default function StadiumLoader({ text = "AI IS THINKING...", subtext = "" }) {
  return (
    <div className="loading-container" style={{ padding: '40px' }}>
      <div className="cricket-ball"></div>
      <div className="loading-text" style={{ marginTop: '20px', letterSpacing: '2px' }}>{text}</div>
      {subtext && <div className="subtitle" style={{ fontSize: '0.9rem', marginTop: '10px', opacity: 0.7 }}>{subtext}</div>}
    </div>
  );
}
