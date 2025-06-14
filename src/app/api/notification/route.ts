import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, body: notificationBody, token, url } = body;

    if (!title || !notificationBody || !token || !url) {
      return NextResponse.json(
        { error: 'Missing required fields: title, body, token, url' },
        { status: 400 }
      );
    }

    // Send notification to Coinbase Wallet
    const notificationResponse = await fetch('https://api.wallet.coinbase.com/rpc/v1/fc/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notificationDetails: {
          title,
          body: notificationBody,
        },
        tokens: [token],
      }),
    });

    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text();
      console.error('Notification API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      );
    }

    const result = await notificationResponse.json();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Notification proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}