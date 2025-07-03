'use client';

import React, { useState, useEffect } from 'react';

const disclaimerText = `By using this app, you consent to our terms. This is an experimental and creative project and should not replace actual DNA analysis. The ancestry results are for fun and may be inaccurate. Do not use them for any real-world, medical, legal, or governmental purposes.`;

const howToUseText = [
  "📸 Upload clear face photo",
  "🔍 Get features analyzed", 
  "🌍 View ancestry results",
  "💾 Download as PDF"
];
const howToUseNote = "🔒 No images stored. Entertainment only!";

export default function DisclaimerPopups({ onCloseAll }: { onCloseAll?: () => void }) {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showHowTo, setShowHowTo] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // Prevent background scroll when popup is open
    if (showDisclaimer || showHowTo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showDisclaimer, showHowTo]);

  const closeDisclaimer = () => {
    setShowDisclaimer(false);
    setShowHowTo(true);
  };
  const closeHowTo = () => {
    setShowHowTo(false);
    if (onCloseAll) onCloseAll();
  };

  // Premium style
  const glass = {
    background: '#f0f0f0',
    boxShadow: '0 12px 40px 0 rgba(0,0,0,0.15)',
    borderRadius: '1.6rem',
    backdropFilter: 'blur(8px)',
    color: '#1a202c',
    border: '1.5px solid rgba(255,255,255,0.2)',
    padding: '2rem 1.8rem 1.8rem',
    maxWidth: 400,
    width: '90%',
    margin: '0 auto',
    position: 'relative',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: '0.01em',
    lineHeight: 1.6,
    zIndex: 1002,
    fontFamily: '"Montserrat", "SF Pro Display", Geist, Inter, sans-serif',
  } as React.CSSProperties;

  const overlay = {
    position: 'fixed' as const,
    zIndex: 1001,
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100vw', height: '100vh',
    background: 'rgba(15,15,20,0.65)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      {showDisclaimer && (
        <div style={overlay}>
          <div
            style={{
              background: '#f0f0f0',
              boxShadow: '0 12px 40px 0 rgba(0,0,0,0.15)',
              borderRadius: '1.6rem',
              backdropFilter: 'blur(8px)',
              color: '#1a202c',
              border: '1.5px solid rgba(255,255,255,0.2)',
              padding: '2rem 1.8rem 1.8rem',
              maxWidth: '400px',
              width: '90%',
              margin: '0 auto',
              position: 'relative',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.6,
              zIndex: 1002,
              fontFamily: '"Montserrat", "SF Pro Display", Geist, Inter, sans-serif',
            }}
            data-component-name="DisclaimerPopups"
          >
            <button
              style={{
                position: 'absolute',
                top: 18,
                right: 20,
                fontSize: '24px',
                background: 'none',
                border: 'none',
                color: '#1a202c',
                cursor: 'pointer',
                boxShadow: '0 2px 10px #23252b12',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              aria-label="Close"
              disabled={!accepted}
            >
              ×
            </button>
            <div style={{
              fontSize: 'clamp(20px, 5vw, 24px)', 
              fontWeight: 700, 
              marginBottom: 'clamp(16px, 4vw, 20px)', 
              letterSpacing: '-0.02em',
              color: '#1a202c',
              position: 'relative',
              paddingBottom: '12px',
            }}>
              <span style={{
                position: 'relative',
                display: 'inline-block',
              }}>
                Disclaimer
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '3px',
                  background: '#3182ce',
                  borderRadius: '2px',
                }}></span>
              </span>
            </div>
            <div style={{
              marginBottom: 20, 
              whiteSpace: 'pre-line',
              padding: '0 10px',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#2d3748',
            }}>{disclaimerText}</div>
            <div style={{
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 12, 
              margin: '24px 0 20px',
              padding: '8px 12px',
              background: 'transparent', 
              borderRadius: '12px',
            }}>
              <input 
                type="checkbox" 
                id="accept-disclaimer" 
                checked={accepted} 
                onChange={e => setAccepted(e.target.checked)} 
                style={{
                  width: 20, 
                  height: 20, 
                  accentColor: '#3182ce', 
                  boxShadow: '0 1px 4px rgba(49, 130, 206, 0.3)', 
                  borderRadius: 4,
                  cursor: 'pointer',
                }} 
              />
              <label 
                htmlFor="accept-disclaimer" 
                style={{
                  fontSize: 15, 
                  color: '#2d3748', 
                  opacity: 0.95, 
                  cursor: 'pointer', 
                  fontWeight: 600,
                  textAlign: 'left',
                }}
              >
                I have read and accept the disclaimer
              </label>
            </div>
            <button 
              onClick={accepted ? closeDisclaimer : undefined} 
              disabled={!accepted} 
              style={{
                marginTop: 12, 
                padding: '12px 36px', 
                borderRadius: 12, 
                background: accepted ? '#3182ce' : '#a0aec0', 
                color: '#fff', 
                border: 'none', 
                cursor: accepted ? 'pointer' : 'not-allowed', 
                fontWeight: 600, 
                boxShadow: accepted ? '0 4px 14px rgba(49, 130, 206, 0.4)' : 'none', 
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {showHowTo && (
        <div style={overlay} onClick={closeHowTo}>
          <div 
            style={{...glass, 
              padding: 'clamp(1.5rem, 5vw, 2rem) clamp(1.2rem, 4vw, 1.8rem) clamp(1.2rem, 4vw, 1.8rem)',
              maxWidth: 'clamp(320px, 90vw, 400px)',
            }} 
            onClick={e => { e.stopPropagation(); closeHowTo(); }}
          >
            <button 
              style={{
                position: 'absolute', 
                top: 18, 
                right: 20, 
                fontSize: 24, 
                background: 'none', 
                border: 'none', 
                color: '#1a202c', 
                cursor: 'pointer',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }} 
              aria-label="Close" 
              onClick={closeHowTo}
            >
              &times;
            </button>
            <div style={{
              fontSize: 24, 
              fontWeight: 700, 
              marginBottom: 20, 
              letterSpacing: '-0.02em',
              color: '#1a202c',
              position: 'relative',
              paddingBottom: '12px',
            }}>
              <span style={{
                position: 'relative',
                display: 'inline-block',
              }}>
                How to Use
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '3px',
                  background: '#3182ce',
                  borderRadius: '2px',
                }}></span>
              </span>
            </div>
            <ul style={{
              margin: '0 0 18px 0',
              padding: 0,
              listStyle: 'none',
              textAlign: 'left',
              fontSize: 'clamp(14px, 4vw, 16px)',
              lineHeight: '1.6',
              color: '#1a202c',
              maxWidth: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontWeight: '500',
            }}>
              {howToUseText.map((item, idx) => (
                <li key={idx} style={{
                  marginBottom: 'clamp(8px, 2vw, 12px)',
                  padding: '4px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}>{item}</li>
              ))}
            </ul>
            <div style={{
              margin: 'clamp(16px, 4vw, 20px) 0 0', 
              fontSize: 'clamp(12px, 3.5vw, 14px)',
              color: '#4a5568',
              textAlign: 'center',
              whiteSpace: 'pre-line',
              fontStyle: 'italic',
              lineHeight: '1.4',
            }}>{howToUseNote}</div>
          </div>
        </div>
      )}
    </>
  );
}
