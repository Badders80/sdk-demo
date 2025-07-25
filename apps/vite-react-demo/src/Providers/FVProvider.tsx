import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FutureverseAuthProvider } from '@futureverse/auth-react';
import { AuthUiProvider, DefaultTheme } from '@futureverse/auth-ui';
import { BrowserRouter as Router } from 'react-router-dom';
import { authClient } from './config';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FutureverseAuthProvider authClient={authClient}>
        <AuthUiProvider themeConfig={DefaultTheme} authClient={authClient}>
          <Router>{children}</Router>
        </AuthUiProvider>
      </FutureverseAuthProvider>
    </QueryClientProvider>
  );
}
