import { NextRequest, NextResponse } from 'next/server';

// This is a proxy endpoint for MiniKit notifications
// It forwards notification requests to the appropriate service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log the notification for debugging
    console.log('Notification received:', body);
    
    // Here you would typically forward the notification to your notification service
    // For now, we'll just acknowledge receipt
    
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

// Handle GET requests for health checks
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Notification endpoint is running' 
  });
}