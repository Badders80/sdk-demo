import { FutureverseAuthClient } from '@futureverse/auth-react/auth';
import { createWagmiConfig } from '@futureverse/wagmi-connectors';
import { QueryClient } from '@tanstack/react-query';

export const authClient = new FutureverseAuthClient({
  clientId: import.meta.env.VITE_FUTUREVERSE_CLIENT_ID || import.meta.env.VITE_FV_APP_ID,
  environment: 'staging',
  redirectUri: 'http://localhost:4200/callback',
  postLogoutRedirectUri: 'http://localhost:4200',
});

export const queryClient = new QueryClient();

export const wagmiConfig = createWagmiConfig({ authClient });
