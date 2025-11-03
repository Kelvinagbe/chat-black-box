'use client' 

import React, { CSSProperties } from 'react';

export default function BlackBoxLanding() {
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
      
      <span style={styles.black}>Black</span>
      

      <style>{keyframes}</style>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  body: {
    margin: 0,
    minHeight: '100vh',
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
    top: '20%',
    left: '39%',
    transform: 'translate(-50%, -50%)',
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
    fontSize: 'clamp(32px, 8vw, 60px)',
    fontWeight: 900,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: 0,
    padding: '0 20px',
    textAlign: 'center',
    whiteSpace: 'nowrap'
  },
  black: {
    color: '#b1b2be',
    textShadow: '1px 1px 2px #333, 2px 2px 4px #222, 3px 3px 6px rgba(0, 0, 0, 0.6)'
  },
  box: {
    color: '#00ff7f',
    textShadow: '1px 1px 2px #007a3d, 2px 2px 4px #006633, 3px 3px 6px rgba(0, 0, 0, 0.6)'
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

  @media (max-width: 768px) {
    body {
      perspective: 600px;
    }
  }

  @media (max-width: 480px) {
    body {
      perspective: 500px;
    }
  }
`;