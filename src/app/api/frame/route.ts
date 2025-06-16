import { NextRequest, NextResponse } from 'next/server';
import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
    });

    if (!isValid) {
      return new NextResponse('Message not valid', { status: 500 });
    }

    const buttonId = message?.button;
    let state = {
      page: 0,
    };

    try {
      state = JSON.parse(decodeURIComponent(message?.state || ''));
    } catch (e) {
      console.error(e);
    }

    // Handle button actions
    if (buttonId === 1) {
      // "Analyze Photo" button clicked
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Upload Photo',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`,
            },
            {
              label: 'Back',
              action: 'post',
            },
          ],
          image: {
            src: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame-image?step=upload`,
          },
          postUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
          state: {
            page: state?.page + 1,
          },
        }),
      );
    } else if (buttonId === 2) {
      // "Learn More" button clicked - redirect to main app
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`,
        { status: 302 }
      );
    }

    // Default frame response
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
            target: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`,
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame-image`,
        },
        postUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
      }),
    );
  } catch (error) {
    console.error('Frame API error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

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
          target: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`,
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame-image`,
      },
      postUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
    }),
  );
}