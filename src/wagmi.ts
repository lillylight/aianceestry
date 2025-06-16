import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { 
  coinbaseWallet,
  injected,
  walletConnect
} from 'wagmi/connectors';

// Get the WalletConnect project ID from environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'dfca8f4268345b4528105ccc6ab2b70c';

// Create the wagmi config
export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    // Coinbase Wallet - recommended for Farcaster miniapps
    coinbaseWallet({
      appName: 'AI Ancestry',
      preference: 'smartWalletOnly', // Use smart wallet for better miniapp experience
    }),
    // Browser extension wallets (MetaMask, etc.)
    injected(),
    // WalletConnect for mobile wallets
    walletConnect({
      projectId,
    }),
  ],
});

// Export the configured coinbaseWallet for use in components
export { coinbaseWallet };