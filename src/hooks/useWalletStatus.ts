import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useWalletContext } from '@coinbase/onchainkit/wallet';

export function useWalletStatus() {
  const walletCtx = useWalletContext?.();
  // Try to find the correct property for address/connection
  const address = walletCtx?.address || walletCtx?.selectedAddress || walletCtx?.walletAddress || null;
  const [isConnected, setIsConnected] = useState(!!address);

  useEffect(() => {
    setIsConnected(!!address);
  }, [address]);

=======
import { useAccount } from 'wagmi';

export function useWalletStatus() {
  const { isConnected, address } = useAccount();
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
  return { isConnected, address };
}
