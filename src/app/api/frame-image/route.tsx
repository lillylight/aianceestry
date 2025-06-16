import { NextRequest, NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';
import React from 'react';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const step = searchParams.get('step') || 'default';

    // Different images based on the step
    let title = 'AI Ancestry Analysis';
    let subtitle = 'Discover your ancestry through AI-powered facial analysis';
    let backgroundGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    if (step === 'upload') {
      title = 'Upload Your Photo';
      subtitle = 'Click the button below to start your ancestry analysis';
      backgroundGradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    } else if (step === 'analyzing') {
      title = 'Analyzing Your Photo';
      subtitle = 'AI is processing your facial features...';
      backgroundGradient = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: backgroundGradient,
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '60px',
              margin: '40px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            {/* DNA Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                marginBottom: '30px',
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: '40px',
                  fontWeight: 'bold',
                }}
              >
                🧬
              </div>
            </div>
            
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1a202c',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
            
            <div
              style={{
                fontSize: '24px',
                color: '#4a5568',
                lineHeight: 1.4,
                maxWidth: '600px',
              }}
            >
              {subtitle}
            </div>
            
            {step === 'default' && (
              <div
                style={{
                  display: 'flex',
                  marginTop: '40px',
                  gap: '20px',
                  fontSize: '18px',
                  color: '#718096',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  ✨ AI-Powered
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  🔒 Secure
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  ⚡ Fast Results
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    console.error('Frame image generation error:', error);
    return new NextResponse('Failed to generate image', { status: 500 });
  }
}