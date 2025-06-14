"use client";

import React from "react";
import type { ReactNode } from "react";
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from "wagmi/chains";

export function Providers(props: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY || process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_CDP_PROJECT_ID || process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID;
  
  if (!apiKey) {
    console.warn('API key is not set in the environment variables.');
  }
  
  if (!projectId) {
    console.warn('Project ID is not set in the environment variables.');
  }
  
  return (
    <MiniKitProvider
      apiKey={apiKey}
      chain={base}
      projectId={projectId}
      notificationProxyUrl="/api/notification"
    >
      {props.children}
    </MiniKitProvider>
  );
}
