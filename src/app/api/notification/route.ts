import { NextRequest, NextResponse } from 'next/server';

// This endpoint is required by MiniKit for notification handling
// It serves as a proxy for MiniKit notifications
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log the notification for debugging
    console.log('MiniKit notification received:', body);
    
    // For now, just acknowledge the notification
    // In a production app, you might want to process the notification
    // and perform actions like updating user state, sending emails, etc.
    
    return NextResponse.json({ 
      success: true, 
      message: 'Notification received' 
    });
  } catch (error) {
    console.error('Error processing notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional, for health checks)
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'MiniKit notification endpoint is running' 
  });
}