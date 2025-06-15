import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export interface FrameData {
  fid: number;
  url: string;
  messageHash: string;
  timestamp: number;
  network: number;
  buttonIndex: number;
  castId?: {
    fid: number;
    hash: string;
  };
}

export async function validateFrameRequest(
  body: FrameRequest,
  options?: {
    neynarApiKey?: string;
  }
): Promise<{ isValid: boolean; message?: FrameData }> {
  try {
    const result = await getFrameMessage(body, {
      neynarApiKey: options?.neynarApiKey || process.env.NEYNAR_API_KEY,
    });

    return {
      isValid: result.isValid,
      message: result.message ? {
        fid: result.message.interactor.fid,
        url: result.message.url,
        messageHash: result.message.hash,
        timestamp: result.message.timestamp,
        network: result.message.network,
        buttonIndex: result.message.button,
        castId: result.message.cast ? {
          fid: result.message.cast.fid,
          hash: result.message.cast.hash,
        } : undefined,
      } : undefined,
    };
  } catch (error) {
    console.error('Frame validation error:', error);
    return { isValid: false };
  }
}

export function createFrameResponse({
  image,
  buttons,
  postUrl,
  aspectRatio = '1.91:1',
}: {
  image: string;
  buttons: Array<{
    label: string;
    action: 'post' | 'link' | 'mint' | 'tx';
    target?: string;
  }>;
  postUrl?: string;
  aspectRatio?: '1.91:1' | '1:1';
}) {
  return getFrameHtmlResponse({
    buttons,
    image: {
      src: image,
      aspectRatio,
    },
    postUrl,
  });
}

export function getFrameImageUrl(step?: string, params?: Record<string, string>) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const url = new URL(`${baseUrl}/api/frame-image`);
  
  if (step) {
    url.searchParams.set('step', step);
  }
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  
  return url.toString();
}

export function getFramePostUrl(endpoint?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  return `${baseUrl}/api/frame${endpoint ? `/${endpoint}` : ''}`;
}