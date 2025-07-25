import { useAuth } from '@futureverse/auth-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

export default function useIsAuthed({ redirectUrl }: { redirectUrl: string }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Return early if auth is not available
  if (!auth) {
    return { isAuthed: false };
  }

  const { userSession, isFetchingSession } = auth;

  const isAuthed = useMemo(
    () => !isFetchingSession && !!userSession,
    [isFetchingSession, userSession]
  );

  useEffect(() => {
    if (
      !isFetchingSession &&
      !userSession &&
      location.pathname !== redirectUrl
    ) {
      navigate(redirectUrl);
    }
  }, [isFetchingSession, userSession, redirectUrl, location, navigate]);

  return { isAuthed };
}
