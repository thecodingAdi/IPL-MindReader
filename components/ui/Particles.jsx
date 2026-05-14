'use client';

import { useState, useEffect } from 'react';

export default function Particles() {
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
}
