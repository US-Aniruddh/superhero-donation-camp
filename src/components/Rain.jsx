import React from 'react';

const Rain = () => {
  const drops = Array.from({ length: 100 });

  return (
    <div className="rain">
      {drops.map((_, i) => (
        <div 
          key={i} 
          className="drop" 
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 0.5 + 0.5}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default Rain;
