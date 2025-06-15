import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import React from 'react';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const step = searchParams.get('step') || 'default';

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    // Different content based on step
    let title = 'AI Ancestry Analysis';
    let subtitle = 'Discover your heritage with AI-powered facial analysis';
    let bgColor = '#f7f8fa';
    let textColor = '#2f80ed';

    switch (step) {
      case 'upload':
        title = 'Upload Your Photo';
        subtitle = 'Click "Upload Photo" to start your ancestry analysis';
        bgColor = '#e3f2fd';
        break;
      case 'info':
        title = 'How It Works';
        subtitle = 'Our AI analyzes facial features to predict ancestry origins';
        bgColor = '#f3e5f5';
        break;
      case 'demo':
        title = 'See It In Action';
        subtitle = 'Watch how our AI analyzes facial features for ancestry insights';
        bgColor = '#fff3e0';
        break;
      case 'results':
        title = 'Analysis Complete';
        subtitle = 'View your detailed ancestry breakdown';
        bgColor = '#e8f5e8';
        break;
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
            backgroundColor: bgColor,
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
              padding: '40px',
              textAlign: 'center',
            }}
          >
            {/* DNA Icon */}
            <div
              style={{
                width: '120px',
                height: '120px',
                backgroundColor: textColor,
                borderRadius: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '30px',
                fontSize: '60px',
                color: 'white',
              }}
            >
              🧬
            </div>
            
            {/* Title */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: textColor,
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              {title}
            </div>
            
            {/* Subtitle */}
            <div
              style={{
                fontSize: '24px',
                color: '#666',
                textAlign: 'center',
                maxWidth: '600px',
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
            
            {/* Brand */}
            <div
              style={{
                fontSize: '18px',
                color: '#999',
                marginTop: '30px',
                textAlign: 'center',
              }}
            >
              Powered by AI Ancestry
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG Image generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}