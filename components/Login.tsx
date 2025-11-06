'use client'

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ChatboxLogin() {
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [slideOut, setSlideOut] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const primaryColor = '#00ff7f';
  const accentColor = '#fff';

  const handleEmailSubmit = () => {
    if (email) {
      setSlideDirection('left');
      setSlideOut(true);
      setTimeout(() => {
        setStep('password');
        setSlideOut(false);
      }, 300);
    }
  };

  const handlePasswordSubmit = () => {
    if (password) {
      console.log('Login with:', { email, password });
      alert('Login successful!');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
      }}>
        {/* Logo/Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
        }}>
          <div style={{
            display: 'inline-block',
            background: primaryColor,
            borderRadius: '50%',
            padding: '16px',
            marginBottom: '16px',
            boxShadow: `0 0 30px ${primaryColor}40`,
          }}>
            <svg 
              viewBox="0 0 24 24" 
              style={{
                width: '48px',
                height: '48px',
                fill: '#000',
              }}
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              <circle cx="8" cy="10" r="1.5"/>
              <circle cx="12" cy="10" r="1.5"/>
              <circle cx="16" cy="10" r="1.5"/>
            </svg>
          </div>
          <h1 style={{
            color: accentColor,
            fontSize: '32px',
            fontWeight: '300',
            marginBottom: '8px',
            letterSpacing: '1px',
          }}>
            Chatbox
          </h1>
          <p style={{
            color: '#888',
            fontSize: '14px',
          }}>
            Sign in to continue
          </p>
        </div>

        {/* Form Container */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Email Step */}
          <div style={{
            transition: 'all 0.3s ease-in-out',
            transform: slideOut && slideDirection === 'left' ? 'translateX(-100%)' : 
                       slideOut && slideDirection === 'right' ? 'translateX(100%)' : 'translateX(0)',
            opacity: slideOut ? 0 : 1,
          }}>
            {step === 'email' && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    color: accentColor,
                    fontSize: '14px',
                    marginBottom: '8px',
                  }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleEmailSubmit)}
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      background: '#0a0a0a',
                      color: accentColor,
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #222',
                      outline: 'none',
                      fontSize: '15px',
                      transition: 'all 0.3s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = primaryColor;
                      e.target.style.boxShadow = `0 0 0 1px ${primaryColor}40`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#222';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button
                  onClick={handleEmailSubmit}
                  style={{
                    width: '100%',
                    background: primaryColor,
                    color: '#000',
                    fontWeight: '600',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    boxShadow: `0 4px 20px ${primaryColor}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 30px ${primaryColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 20px ${primaryColor}40`;
                  }}
                >
                  Next
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Password Step */}
          <div style={{
            position: step === 'password' && !slideOut ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transition: 'all 0.3s ease-in-out',
            transform: step === 'password' && !slideOut ? 'translateX(0)' : 
                       step === 'password' && slideOut && slideDirection === 'right' ? 'translateX(-100%)' : 'translateX(100%)',
            opacity: step === 'password' && !slideOut ? 1 : 0,
          }}>
            {step === 'password' && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <button
                    onClick={() => {
                      setSlideDirection('right');
                      setSlideOut(true);
                      setTimeout(() => {
                        setStep('email');
                        setSlideOut(false);
                      }, 300);
                    }}
                    style={{
                      color: primaryColor,
                      fontSize: '14px',
                      marginBottom: '16px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    ← Change email
                  </button>
                  <div style={{
                    color: '#888',
                    fontSize: '14px',
                    marginBottom: '16px',
                  }}>
                    {email}
                  </div>
                  <label style={{
                    display: 'block',
                    color: accentColor,
                    fontSize: '14px',
                    marginBottom: '8px',
                  }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handlePasswordSubmit)}
                    placeholder="Enter your password"
                    autoFocus
                    style={{
                      width: '100%',
                      background: '#0a0a0a',
                      color: accentColor,
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #222',
                      outline: 'none',
                      fontSize: '15px',
                      transition: 'all 0.3s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = primaryColor;
                      e.target.style.boxShadow = `0 0 0 1px ${primaryColor}40`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#222';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button
                  onClick={handlePasswordSubmit}
                  style={{
                    width: '100%',
                    background: primaryColor,
                    color: '#000',
                    fontWeight: '600',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    boxShadow: `0 4px 20px ${primaryColor}40`,
                    marginBottom: '16px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 30px ${primaryColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 20px ${primaryColor}40`;
                  }}
                >
                  Sign in
                  <ArrowRight size={20} />
                </button>

                <button
                  style={{
                    width: '100%',
                    color: primaryColor,
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  Forgot password?
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '48px',
          textAlign: 'center',
          color: '#555',
          fontSize: '12px',
        }}>
          <p>By continuing, you agree to our Terms of Service</p>
          <p style={{ marginTop: '8px' }}>and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}