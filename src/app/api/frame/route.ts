import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Frame endpoint active' });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Frame interaction received:', body);
    
    // Handle frame button clicks
    if (body.untrustedData?.buttonIndex === 1) {
      // Redirect to the main app
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || 'https://aianceestry-5h7h.vercel.app'}/hero.png" />
            <meta property="fc:frame:button:1" content="Open App" />
            <meta property="fc:frame:button:1:action" content="link" />
            <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_URL || 'https://aianceestry-5h7h.vercel.app'}" />
          </head>
          <body>
            <p>Click the button to open AI Ancestry Analysis</p>
          </body>
        </html>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
          },
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}