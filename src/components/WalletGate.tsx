import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Wallet, useWalletContext } from '@coinbase/onchainkit/wallet';
=======
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
import { useAccount } from 'wagmi';

export default function WalletGate({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  
  // Handle client-side mounting to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
<<<<<<< HEAD
    <Wallet>
=======
    <>
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
      {isConnected ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-800/70 rounded-2xl border border-gray-700/50 shadow-lg text-center max-w-md mx-auto my-8">
<<<<<<< HEAD
          <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 p-4 rounded-2xl mb-4 border border-yellow-700/30 shadow-lg">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-yellow-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-yellow-300 font-medium">
                Wallet Connection Required
              </p>
            </div>
            <p className="text-sm text-yellow-200 mt-2">
              Please connect your wallet using the button in the top right corner to access this content.
            </p>
          </div>
        </div>
      )}
    </Wallet>
=======
          <div className="flex flex-col items-center justify-center">
            <svg className="w-8 h-8 text-yellow-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-yellow-300 font-medium">
              Wallet Connection Required
            </p>
          </div>
          <p className="text-sm text-yellow-200 mt-2">
            Please connect your wallet using the button in the top right corner to access this content.
          </p>
        </div>
      )}
    </>
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  );
}
