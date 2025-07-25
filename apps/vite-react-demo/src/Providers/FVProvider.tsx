import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FutureverseAuthProvider, FutureverseWagmiProvider } from '@futureverse/auth-react';
import { AuthUiProvider, DefaultTheme } from '@futureverse/auth-ui';
import { BrowserRouter as Router } from 'react-router-dom';
import { authClient, queryClient, wagmiConfig } from './config';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FutureverseWagmiProvider config={wagmiConfig}>
        <FutureverseAuthProvider authClient={authClient}>
          <AuthUiProvider themeConfig={DefaultTheme} authClient={authClient}>
            <Router>{children}</Router>
          </AuthUiProvider>
        </FutureverseAuthProvider>
      </FutureverseWagmiProvider>
    </QueryClientProvider>
  );
}
