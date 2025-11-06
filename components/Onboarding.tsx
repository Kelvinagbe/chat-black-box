'use client'

import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Shield, Zap } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('left');

  const primaryColor = '#00ff7f';
  const accentColor = '#fff';

  const pages = [
    {
      icon: MessageCircle,
      title: 'Welcome to Chatbox',
      description: 'Connect with friends and family through seamless messaging'
    },
    {
      icon: Zap,
      title: 'Stay Connected',
      description: 'Real-time messaging with notifications to never miss a moment'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your conversations are encrypted and protected'
    }
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setSlideDirection('left');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setSlideDirection('left');
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 300);
    }
  };

  const handleSkip = () => {
    setSlideDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(pages.length - 1);
      setSlideDirection('left');
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const handleGetStarted = () => {
    onComplete();
  };

  const IconComponent = pages[currentPage].icon;

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
        position: 'relative',
      }}>
        {/* Skip Button */}
        {currentPage < pages.length - 1 && (
          <button
            onClick={handleSkip}
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              color: primaryColor,
              fontSize: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              fontWeight: '500',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Skip
          </button>
        )}

        {/* Content Container */}
        <div style={{
          marginTop: '60px',
          textAlign: 'center',
          transform: isAnimating && slideDirection === 'left' 
            ? 'translateX(-100%)' 
            : isAnimating && slideDirection === 'right'
            ? 'translateX(-100%)'
            : 'translateX(0)',
          opacity: isAnimating ? 0 : 1,
          transition: 'all 0.3s ease-in-out',
        }}>
          {/* Icon */}
          <div style={{
            display: 'inline-block',
            background: primaryColor,
            borderRadius: '50%',
            padding: '32px',
            marginBottom: '48px',
            boxShadow: `0 0 40px ${primaryColor}50`,
            transition: 'all 0.3s ease-in-out',
          }}>
            <IconComponent 
              size={64} 
              color="#000"
              strokeWidth={2}
            />
          </div>

          {/* Title */}
          <h1 style={{
            color: accentColor,
            fontSize: '32px',
            fontWeight: '600',
            marginBottom: '16px',
            letterSpacing: '0.5px',
          }}>
            {pages[currentPage].title}
          </h1>

          {/* Description */}
          <p style={{
            color: '#888',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '48px',
            padding: '0 24px',
          }}>
            {pages[currentPage].description}
          </p>

          {/* Page Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '48px',
          }}>
            {pages.map((_, index) => (
              <div
                key={index}
                style={{
                  width: currentPage === index ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentPage === index ? primaryColor : '#333',
                  transition: 'all 0.3s ease-in-out',
                }}
              />
            ))}
          </div>

          {/* Action Button */}
          {currentPage < pages.length - 1 ? (
            <button
              onClick={handleNext}
              style={{
                width: '100%',
                background: primaryColor,
                color: '#000',
                fontWeight: '600',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
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
              Continue
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleGetStarted}
              style={{
                width: '100%',
                background: primaryColor,
                color: '#000',
                fontWeight: '600',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
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
              Get Started
              <ArrowRight size={20} />
            </button>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '48px',
          textAlign: 'center',
          color: '#555',
          fontSize: '12px',
        }}>
          <p>By continuing, you agree to our</p>
          <p style={{ marginTop: '4px' }}>
            <span style={{ color: primaryColor, cursor: 'pointer' }}>Terms of Service</span>
            {' '}&{' '}
            <span style={{ color: primaryColor, cursor: 'pointer' }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}