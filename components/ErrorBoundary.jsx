'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Game Engine Crash caught by ErrorBoundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload(); // Hard reset for stability during hackathon
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div className="scoreboard-panel" style={{ textAlign: 'center', maxWidth: '500px', border: '2px solid #ef4444' }}>
            <h1 className="title-glow" style={{ color: '#ef4444' }}>🏏 MATCH ABANDONED</h1>
            <div className="animated-underline" style={{ background: '#ef4444' }}></div>
            
            <p className="subtitle" style={{ fontSize: '1.2rem', margin: '20px 0' }}>
              The AI Umpire has detected a critical system failure! ⛈️
            </p>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '30px', textAlign: 'left', fontSize: '0.8rem', fontFamily: 'monospace', color: '#ef4444' }}>
              Error: {this.state.error?.message || "Unknown anomaly detected in the brain engine."}
            </div>
            
            <button className="btn-start" onClick={this.handleReset} style={{ background: '#ef4444' }}>
              RESTART MATCH
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
