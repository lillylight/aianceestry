"use client";

import React from "react";
import type { ReactNode } from "react";
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from "wagmi/chains";

export function Providers(props: { children: ReactNode }) {
  // Log the API key being used (without revealing the full key)
  const apiKey = process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY || process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_CDP_CLIENT_API_KEY is not set in the environment variables.');
  }
  
  return (
    <MiniKitProvider
      apiKey={apiKey}
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'snake',
          name: process.env.NEXT_PUBLIC_PROJECT_NAME || "AI Ancestry",
          logo: process.env.NEXT_PUBLIC_ICON_URL || "/favicon.png",
        },
      }}
    >
      {props.children}
    </MiniKitProvider>
  );
}
