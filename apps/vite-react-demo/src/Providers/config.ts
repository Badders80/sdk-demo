import { FutureverseAuthClient } from '@futureverse/auth-react/auth';

export const authClient = new FutureverseAuthClient({
  clientId: import.meta.env.VITE_FUTUREVERSE_CLIENT_ID || import.meta.env.VITE_FV_APP_ID,
  environment: 'staging',
  redirectUri: 'http://localhost:4200/callback',
  postLogoutRedirectUri: 'http://localhost:4200',
});
