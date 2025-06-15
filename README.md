# AI Ancestry - MiniKit Mini App

This is an AI-powered ancestry analysis app built with [Next.js](https://nextjs.org) and integrated with [MiniKit](https://docs.base.org/builderkits/minikit/) for seamless deployment as a mini app on Warpcast and Coinbase Wallet.

## Features

- 🧬 AI-powered ancestry analysis from photos
- 📊 Interactive ancestry pie charts
- 💳 Integrated payments with OnchainKit
- 📱 Mini app functionality with MiniKit
- 🔗 Add to Frames functionality
- 📄 PDF report generation
- 🌐 Social sharing capabilities

## MiniKit Integration

This app is now a fully functional MiniKit mini app that can be:
- Featured on Warpcast as a Frame
- Accessed through Coinbase Wallet
- Added to users' personal frame collections

### Key MiniKit Features
- **Frame Ready**: Automatically initializes when loaded in supported environments
- **Add to Frames**: Users can add the app to their personal collection
- **Notifications**: Integrated notification system via `/api/notification`
- **Wallet Integration**: Seamless connection with Coinbase Wallet and other providers

## Getting Started

### Prerequisites

1. Get your API keys:
   - OnchainKit API Key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
   - CDP Project ID (required for MiniKit)
   - WalletConnect Project ID (optional)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your actual API keys in `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
NEXT_PUBLIC_CDP_PROJECT_ID=your_cdp_project_id_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
NEXT_PUBLIC_PRODUCT_ID=your_product_id_here
```

## Deployment

### Vercel (Recommended)

This app is optimized for deployment on [Vercel](https://vercel.com), which integrates seamlessly with the required backend services for frames, webhooks, and notifications.

1. Connect your repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy!

The `vercel.json` configuration is already set up for optimal MiniKit performance.

## Architecture

### MiniKit Provider
The app uses `MiniKitProvider` instead of the standard `OnchainKitProvider`, which:
- Automatically sets up wagmi and react-query providers
- Configures connectors for both Frame and standalone environments
- Handles frame initialization and context management

### API Endpoints
- `/api/notification` - Handles MiniKit notifications and webhooks

### Key Components
- **MiniKit Hooks**: `useMiniKit()` and `useAddFrame()` for frame functionality
- **Wallet Integration**: Seamless connection with multiple wallet providers
- **Chart Generation**: Interactive ancestry visualization
- **PDF Export**: Comprehensive ancestry reports

## Learn More

- [MiniKit Documentation](https://docs.base.org/builderkits/minikit/)
- [OnchainKit Documentation](https://onchainkit.xyz/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Base Documentation](https://docs.base.org/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# aiancestry

**A project by Lady Light**

---

## What is aiancestry?

aiancestry is an innovative, experimental platform that reimagines ancestry analysis for the modern world. Harnessing the power of artificial intelligence, blockchain, and cutting-edge onchain technologies, aiancestry aims to make discovering your roots more accessible, affordable, and secure than ever before.

Unlike traditional DNA testing services that are often expensive, slow, and limited by geography, aiancestry aspires to democratize ancestry discovery—empowering anyone, anywhere, to explore their heritage using the latest advancements in AI and decentralized technology.

## Vision & Mission

The long-term vision for aiancestry is bold:
- **To provide a reliable, low-cost, and privacy-centric alternative to expensive DNA tests**
- **To make ancestry insights available to people worldwide, regardless of background or location**
- **To leverage blockchain and AI for transparency, security, and continuous improvement**

We believe that with robust training, real-world feedback, and a vibrant community, aiancestry can one day become a trusted tool for personal heritage exploration—removing barriers and opening new doors for millions.

## Experimental Phase & Disclaimer

aiancestry is currently in an **experimental testing phase**. This means:
- The platform is under active development and research.
- Results may be inaccurate, incomplete, or subject to change as the AI is further trained and improved.
- **aiancestry should NOT be used to replace current, medically-approved DNA testing services.**
- All outputs are for informational and experimental purposes only.

We are committed to transparency and ethical development. As we gather more data and feedback, we will continue to refine the AI, improve accuracy, and expand capabilities.

## What We Hope to Solve

- **Cost:** Traditional DNA tests can be prohibitively expensive. aiancestry seeks to offer a much more affordable alternative.
- **Accessibility:** Many people around the world cannot access DNA testing. aiancestry aims to break down these barriers using digital, onchain tools.
- **Speed:** AI-powered analysis can provide insights in minutes, not weeks.
- **Privacy:** By building on the blockchain and using decentralized protocols, users have more control over their data and privacy.

## Technology & Approach

aiancestry is built at the intersection of several advanced technologies:
- **Artificial Intelligence:** Uses OpenAI models for sophisticated, context-aware ancestry analysis.
- **Blockchain:** Built on the Base chain, leveraging OnchainKit for secure, transparent, and verifiable onchain interactions.
- **Onramp & Web3 Tools:** Integrates modern onramp solutions and wallet connectivity for seamless, user-friendly onboarding.
- **Open Source Ethos:** Committed to transparency, community feedback, and continuous improvement.

## Ethical Considerations

- **Transparency:** We are clear about the experimental nature of the project and its current limitations.
- **Data Privacy:** Your data is your own. By leveraging blockchain, we strive to ensure user privacy and data sovereignty.
- **No Medical Claims:** aiancestry is not a medical product and should not be used for health-related decisions.

## The Road Ahead

The journey for aiancestry is just beginning. Our roadmap includes:
- Robust AI training with diverse datasets
- Community-driven feedback and feature requests
- Partnerships with researchers and technologists
- Enhanced privacy and security features
- Ongoing improvements in accuracy, speed, and usability

## Want to Learn More, Fund, or Collaborate?

aiancestry thrives on curiosity, collaboration, and support. If you:
- Want to know more about the project
- Are interested in funding or supporting our mission
- Have ideas, feedback, or want to collaborate

**Please contact Lady Light!**

Together, we can shape the future of ancestry discovery—making it open, ethical, and accessible for all.

---

*aiancestry is a vision for the future. Join us as we test, improve, and work towards making ancestry discovery accessible for everyone, everywhere.*

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
