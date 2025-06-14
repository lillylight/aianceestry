"use client";

import React from "react";
import type { ReactNode } from "react";
<<<<<<< HEAD
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
=======
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { base } from "wagmi/chains";

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'snake', // You can change this to your preferred theme
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || 'AI Ancestry',
          logo: process.env.NEXT_PUBLIC_ICON_URL || '/onchainkit-logo.png',
        },
      }}
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
    >
      {props.children}
    </MiniKitProvider>
  );
}
