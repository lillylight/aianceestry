"use client";

import React from "react";
import type { ReactNode } from "react";
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { base } from "wagmi/chains";
import { config } from './wagmi';

// Create a client
const queryClient = new QueryClient();

export function Providers(props: { children: ReactNode }) {
  // Log the API key being used (without revealing the full key)
  const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_ONCHAINKIT_API_KEY is not set in the environment variables.');
  }
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MiniKitProvider
          apiKey={apiKey}
          projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
          chain={base}
          notificationProxyUrl="/api/notification"
          config={{
            appearance: {
              name: "AI Ancestry",
              theme: "dark",
              logo: "/onchainkit-logo.png",
            },
          }}
        >
          {props.children}
        </MiniKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
