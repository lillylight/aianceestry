# AI Ancestry - MiniKit Integration

This project has been converted to use MiniKit for seamless integration with Coinbase Wallet and Warpcast as a Mini App.

## What's Changed

### 1. Provider Setup
- Updated `providers.tsx` to use `MiniKitProvider` as the root provider
- Removed manual wagmi and react-query setup (handled automatically by MiniKit)
- Added notification proxy URL configuration

### 2. MiniKit Hooks Integration
- Added `useMiniKit`, `useAddFrame`, `useNotification`, `useOpenUrl`, and `useClose` hooks
- Implemented frame ready functionality
- Added notification support for analysis completion

### 3. New API Route
- Created `/api/notification/route.ts` for handling notifications
- Proxies notification requests to Coinbase Wallet API to avoid CORS issues

### 4. Enhanced Features
- "Add to Wallet" button for users to subscribe to notifications
- Automatic notifications when ancestry analysis is complete
- MiniKit-compatible URL opening for social sharing

## Environment Variables Required

Make sure you have these environment variables set:

```env
# OnchainKit API Key
NEXT_PUBLIC_CDP_CLIENT_API_KEY=your_api_key_here
# OR
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here

# Project ID for MiniKit
NEXT_PUBLIC_CDP_PROJECT_ID=your_project_id_here
# OR
NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID=your_project_id_here

# Product ID for Checkout
NEXT_PUBLIC_PRODUCT_ID=your_product_id_here

# WalletConnect Project ID (if using WalletConnect)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
```

## How to Deploy

1. **Vercel Deployment (Recommended)**
   ```bash
   npm run build
   # Deploy to Vercel
   ```

2. **Environment Setup**
   - Set all required environment variables in your deployment platform
   - Ensure the notification API route is accessible at `/api/notification`

3. **Frame Configuration**
   - The app is configured with proper frame metadata in `layout.tsx`
   - Update the URLs in metadata to match your deployment domain

## MiniKit Features Used

- **Frame Ready**: Properly initializes the mini app within Coinbase Wallet
- **Add Frame**: Allows users to add the app to their wallet for notifications
- **Notifications**: Sends push notifications when ancestry analysis is complete
- **URL Opening**: Opens external URLs (social sharing) within the wallet context
- **OnchainKit Integration**: Seamless wallet connection and transaction handling

## Testing

1. **In Coinbase Wallet**: Deploy and test as a mini app
2. **In Warpcast**: Test frame functionality
3. **Standalone**: Should work as a regular web app with fallback behavior

## Key Files Modified

- `src/providers.tsx` - MiniKit provider setup
- `src/app/page.tsx` - MiniKit hooks integration
- `src/app/layout.tsx` - Added Metadata import
- `src/app/api/notification/route.ts` - New notification proxy

The app now fully supports MiniKit functionality while maintaining backward compatibility as a standalone web application.