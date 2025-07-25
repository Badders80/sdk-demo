import { FutureverseAuthClient } from '@futureverse/auth';
import { createWagmiConfig } from '@futureverse/auth-react/wagmi';
import { QueryClient } from '@tanstack/react-query';

console.log('Environment variables:', {
  clientId: import.meta.env.VITE_FUTUREVERSE_CLIENT_ID,
  mode: import.meta.env.MODE,
  prod: import.meta.env.PROD,
});

export const authClient = new FutureverseAuthClient({
  clientId: import.meta.env.VITE_FUTUREVERSE_CLIENT_ID,
  environment: 'staging',
  redirectUri: 'http://localhost:4200/callback',
  postLogoutRedirectUri: 'http://localhost:4200',
});

console.log('Auth client created successfully for staging environment');

export const wagmiConfig = createWagmiConfig({ authClient });

export const queryClient = new QueryClient();
