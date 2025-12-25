import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface LocationState {
  from?: string;
}

export function useAuthNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const getHomeRoute = () => {
    // Priority 1: If we have origin in location state, use it to determine back route
    const state = location.state as LocationState | null;
    if (state?.from) {
      // If came from app routes (/home/*), go back to /home
      // If came from landing page routes, go back to /
      return state.from.startsWith('/home') ? '/home' : '/';
    }
    // Priority 2: Fall back to auth-based navigation for direct URL access
    return isAuthenticated ? '/home' : '/';
  };

  const getBackLabel = () => {
    const state = location.state as LocationState | null;
    if (state?.from) {
      return state.from.startsWith('/home') ? 'Back to Home' : 'Back';
    }
    return isAuthenticated ? 'Back to Home' : 'Back';
  };

  const navigateToHome = () => {
    navigate(getHomeRoute());
  };

  return {
    navigateToHome,
    getHomeRoute,
    getBackLabel,
    isAuthenticated,
  };
}
