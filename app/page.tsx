'use client' 

import React, { useState, useEffect } from 'react';

export default function BlackBoxLanding() {
  const [displayText, setDisplayText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const textParts = [
      'Shadows move in code...\nEnter BlackBox — where ',
      '<span style="color:red;">secrets</span>',
      ' become power...\n built by devs for devs'
    ];

    let partIndex = 0;
    const speed = 80;

    const typeEffect = () => {
      if (partIndex < textParts.length) {
        const part = textParts[partIndex];

        if (/<.*?>/.test(part)) {
          // If part contains HTML, add it immediately
          setDisplayText(prev => prev + part);
          partIndex++;
          setTimeout(typeEffect, speed);
        } else {
          // Type character by character
          let charIndex = 0;
          const typeChar = () => {
            if (charIndex < part.length) {
              setDisplayText(prev => prev + part.charAt(charIndex));
              charIndex++;
              setTimeout(typeChar, speed);
            } else {
              partIndex++;
              setTimeout(typeEffect, speed);
            }
          };
          typeChar();
        }
      } else {
        setIsTypingComplete(true);
        setShowButton(true);
      }
    };

    const timer = setTimeout(typeEffect, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    // Navigate to homepage - in a real app, use React Router
    window.location.href = "homepage.html";
  };

  return (
    <div style={styles.body}>
      <div style={styles.backgroundGrid}></div>

      {/* Rotating 3D Box */}
      <div style={styles.cube}>
        <div style={{...styles.face, ...styles.front}}></div>
        <div style={{...styles.face, ...styles.back}}></div>
        <div style={{...styles.face, ...styles.right}}></div>
        <div style={{...styles.face, ...styles.left}}></div>
        <div style={{...styles.face, ...styles.top}}></div>
        <div style={{...styles.face, ...styles.bottom}}></div>
      </div>

      <div style={styles.projection}></div>

      {/* Title */}
      <h1 style={styles.title}>
        <span style={styles.black}>Black</span>
        <span style={styles.box}>Box</span>
      </h1>

      {/* Typewriter Text */}
      <p 
        style={{
          ...styles.introText,
          borderRight: isTypingComplete ? 'none' : '3px solid #00ff7f'
        }}
        dangerouslySetInnerHTML={{ __html: displayText }}
      />

      {/* Enter Button */}
      {showButton && (
        <button 
          style={styles.enterBtn}
          onClick={handleEnter}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateX(-50%) scale(1.05)';
            e.target.style.background = 'rgba(0, 255, 127, 0.1)';
            e.target.style.color = '#00ffcc';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateX(-50%)';
            e.target.style.background = 'transparent';
            e.target.style.color = '#00ff7f';
          }}
        >
          Join blackBox
        </button>
      )}

      <style>{keyframes}</style>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    height: '100vh',
    background: 'radial-gradient(black, #050505)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    perspective: '800px',
    position: 'relative'
  },
  backgroundGrid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
    backgroundSize: '80px 80px',
    opacity: 0.05,
    zIndex: 0
  },
  cube: {
    position: 'absolute',
    top: 'calc(50% - 200px)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '100px',
    transformStyle: 'preserve-3d',
    animation: 'cube-rotate 10s infinite linear',
    zIndex: 2
  },
  face: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    background: 'black',
    border: '2px solid white',
    boxShadow: '0 0 20px white',
    color: 'white'
  },
  front: { transform: 'translateZ(50px)' },
  back: { transform: 'rotateY(180deg) translateZ(50px)' },
  right: { transform: 'rotateY(90deg) translateZ(50px)' },
  left: { transform: 'rotateY(-90deg) translateZ(50px)' },
  top: { transform: 'rotateX(90deg) translateZ(50px)' },
  bottom: { transform: 'rotateX(-90deg) translateZ(50px)' },
  projection: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    width: '220px',
    height: '220px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 80%)',
    transform: 'translate(-50%, -50%) rotateX(90deg)',
    filter: 'blur(50px)',
    opacity: 0.6,
    animation: 'beamPulse 2.5s infinite ease-in-out',
    zIndex: 0
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '60px',
    fontWeight: 900,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: 0
  },
  black: {
    color: '#b1b2be',
    textShadow: '1px 1px 2px #333, 2px 2px 4px #222, 3px 3px 6px rgba(0, 0, 0, 0.6)'
  },
  box: {
    color: '#00ff7f',
    textShadow: '1px 1px 2px #007a3d, 2px 2px 4px #006633, 3px 3px 6px rgba(0, 0, 0, 0.6)'
  },
  introText: {
    position: 'absolute',
    top: '65%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '18px',
    color: '#bfbfbf',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '1px',
    textAlign: 'center',
    width: '400px',
    whiteSpace: 'pre-line',
    animation: 'blinkCursor 0.7s steps(1) infinite'
  },
  enterBtn: {
    position: 'absolute',
    top: '78%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px 28px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#00ff7f',
    background: 'transparent',
    border: '2px solid #00ff7f',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.3s, background 0.3s, color 0.3s',
    fontFamily: "'Orbitron', sans-serif"
  }
};

const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');

  @keyframes cube-rotate {
    0% { transform: rotateX(0) rotateY(0); }
    25% { transform: rotateX(90deg) rotateY(180deg); }
    50% { transform: rotateX(180deg) rotateY(270deg); }
    75% { transform: rotateX(270deg) rotateY(90deg); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }

  @keyframes beamPulse {
    0%, 100% { 
      opacity: 0.4; 
      transform: translate(-50%, -50%) rotateX(90deg) scale(1); 
    }
    50% { 
      opacity: 0.8; 
      transform: translate(-50%, -50%) rotateX(90deg) scale(1.2); 
    }
  }

  @keyframes blinkCursor {
    50% { border-color: transparent; }
  }
`;