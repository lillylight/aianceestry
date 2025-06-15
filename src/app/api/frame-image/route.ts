import { NextRequest, NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const step = searchParams.get('step') || 'default';

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    if (step === 'upload') {
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
              backgroundColor: '#1a1a1a',
              backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#f59e0b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '20px',
                }}
              >
                <span style={{ fontSize: '40px' }}>🧬</span>
              </div>
              <h1 style={{ fontSize: '48px', margin: '0', fontWeight: 'bold' }}>
                AI Ancestry
              </h1>
            </div>
            <p style={{ fontSize: '24px', textAlign: 'center', margin: '0 40px', opacity: 0.9 }}>
              Click "Upload Photo" to start your ancestry analysis
            </p>
            <div
              style={{
                marginTop: '40px',
                padding: '20px 40px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '12px',
                border: '2px solid #f59e0b',
              }}
            >
              <p style={{ fontSize: '18px', margin: '0', color: '#f59e0b' }}>
                📸 Upload your photo → 🧬 Get detailed ancestry analysis
              </p>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // Default frame image
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
            backgroundColor: '#1a1a1a',
            backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '30px',
              }}
            >
              <span style={{ fontSize: '50px' }}>🧬</span>
            </div>
            <h1 style={{ fontSize: '64px', margin: '0', fontWeight: 'bold' }}>
              AI Ancestry
            </h1>
          </div>
          <p style={{ fontSize: '28px', textAlign: 'center', margin: '0 40px', opacity: 0.9 }}>
            Discover your genetic heritage through advanced AI analysis
          </p>
          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              gap: '30px',
            }}
          >
            <div
              style={{
                padding: '15px 25px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '8px',
                border: '1px solid #f59e0b',
              }}
            >
              <span style={{ fontSize: '16px', color: '#f59e0b' }}>🔬 Advanced Genetic Markers</span>
            </div>
            <div
              style={{
                padding: '15px 25px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '8px',
                border: '1px solid #f59e0b',
              }}
            >
              <span style={{ fontSize: '16px', color: '#f59e0b' }}>🌍 Global Ancestry Database</span>
            </div>
            <div
              style={{
                padding: '15px 25px',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '8px',
                border: '1px solid #f59e0b',
              }}
            >
              <span style={{ fontSize: '16px', color: '#f59e0b' }}>⚡ Instant Results</span>
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
    console.error('Frame image generation error:', error);
    return new NextResponse('Error generating image', { status: 500 });
  }
}

export const runtime = 'edge';