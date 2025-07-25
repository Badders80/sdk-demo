import { createWagmiConfig } from '@futureverse/wagmi-connectors';
import { FutureverseAuthClient, ENVIRONMENTS } from '@futureverse/auth-react/auth';
import { polygonAmoy, sepolia, mainnet } from 'viem/chains';
import { QueryClient } from '@tanstack/react-query';
import { cookieStorage, createStorage } from 'wagmi';

const clientId = import.meta.env.VITE_FV_APP_ID;
const environment = import.meta.env.VITE_FV_ENV;
const redirectUri = import.meta.env.VITE_FV_REDIRECT_URI;
const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT;
const xamanAPIKey = import.meta.env.VITE_XAMAN_API;

// Validate required environment variables
if (!clientId) {
  console.error('VITE_FV_APP_ID is required but not set in environment variables');
}

if (!environment) {
  console.warn('VITE_FV_ENV not set, defaulting to ENVIRONMENTS.staging');
}

export const authClient = new FutureverseAuthClient({
  clientId: clientId || '',
  environment: environment || ENVIRONMENTS.staging,
  redirectUri: redirectUri || (typeof window !== 'undefined' ? `${window.location.origin}/auth` : ''),
  signInFlow: 'redirect',
});
export const queryClient = new QueryClient();

export const getWagmiConfig = async () => {
  return createWagmiConfig({
    walletConnectProjectId,
    xamanAPIKey,
    authClient,
    ssr: true,
    chains: [mainnet, sepolia, polygonAmoy],
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
};
