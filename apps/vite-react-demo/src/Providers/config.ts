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

let wagmiConfig;
try {
  wagmiConfig = createWagmiConfig({ authClient });
  console.log('Wagmi config created successfully');
} catch (error) {
  console.error('Failed to create wagmi config:', error);
  throw error;
}

export { wagmiConfig };

export const queryClient = new QueryClient();
