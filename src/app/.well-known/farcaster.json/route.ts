export async function GET() {
  // Use the public URL from environment variables or fallback to vercel.app
  const URL = process.env.NEXT_PUBLIC_URL || 'https://aiancestry.xyz';
  
  // Required account association - ensure these environment variables are set in your deployment
  const accountAssociation = {
    header: process.env.FARCASTER_HEADER || "eyJmaWQiOjk4MjA5MSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDEyMmYyOTM1YjhBMTI1Rjg3NTM4MkZDMDVGRjE5MTZmMmE0OTYyNmMifQ",
    payload: process.env.FARCASTER_PAYLOAD || "eyJkb21haW4iOiJhaWFuY2VzdHJ5Lnh5eiJ9",
    signature: process.env.FARCASTER_SIGNATURE || "MHgyYTUyYzAxOTc5YjUyNjJhOThiMTI5ZDAzMWVmOGZiNzE2YTNhOWYyN2Y4MTJmNTE1OWFkZmZiNzdmYjkyODZmMDhkNGVmMzUzOGIwYzkzNTRkNjVhZjFlYWUzNjI2OGI1NTVkOGQ2Y2Q2M2I3ZmQwNDk3MGRiNjc3MjQ0OTRiNjFi"
  };

  // Frame configuration with all required fields
  const manifest = {
    accountAssociation,
    frame: {
      version: "1",
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "AI Ancestry",
      iconUrl: `${URL}/icon.png`,
      splashImageUrl: `${URL}/splash.png`,
      splashBackgroundColor: "#ffffff",
      homeUrl: URL,
      subtitle: "Discover your ancestry with AI",
      description: "Get AI-powered ancestry analysis and insights based on your genetic data.",
      primaryCategory: "utility",
      tags: ["ancestry", "ai", "genetics", "dna"],
      heroImageUrl: `${URL}/hero.png`,
      ogTitle: "AI Ancestry Analysis",
      ogDescription: "Discover your ancestry through AI-powered analysis of your genetic data.",
      ogImageUrl: `${URL}/og.png`,
      // Optional: Add these if you plan to use notifications
      // webhookUrl: process.env.FARCASTER_WEBHOOK_URL,
      // requiredChains: ["eip155:1"], // Add required chains if needed
      // requiredCapabilities: ["actions.signIn"] // Add required capabilities if needed
    }
  };

  // Create response with proper headers
  const response = new Response(JSON.stringify(manifest, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Vary': 'Accept-Encoding'
    }
  });

  return response;
}
