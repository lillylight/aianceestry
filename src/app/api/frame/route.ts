import { NextRequest, NextResponse } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export async function GET() {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Analyze Photo',
          action: 'post',
        },
        {
          label: 'Learn More',
          action: 'link',
          target: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame-image`,
        aspectRatio: '1.91:1',
      },
      postUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
    })
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: process.env.NEYNAR_API_KEY,
    });

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid frame message' }, { status: 400 });
    }

    const buttonIndex = message?.button;
    
    // Handle different button actions
    if (buttonIndex === 1) {
      // Analyze Photo button clicked - redirect to main app
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Upload Photo',
              action: 'link',
              target: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
            },
            {
              label: 'Back',
              action: 'post',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame-image?step=upload`,
            aspectRatio: '1.91:1',
          },
          postUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
        })
      );
    }

    // Default response - back to initial frame
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Analyze Photo',
            action: 'post',
          },
          {
            label: 'Learn More',
            action: 'link',
            target: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame-image`,
          aspectRatio: '1.91:1',
        },
        postUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
      })
    );
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const runtime = 'nodejs';
export const maxDuration = 30;