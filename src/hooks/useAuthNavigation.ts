import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  from?: string;
}

export function useAuthNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const getHomeRoute = () => {
    const state = location.state as LocationState | null;
    // Return exact origin path, or fallback to landing page
    return state?.from || '/';
  };

  const getBackLabel = () => {
    const state = location.state as LocationState | null;
    if (state?.from) {
      if (state.from === '/') return 'Back';
      if (state.from === '/home/settings') return 'Back to Settings';
      if (state.from === '/home/profile') return 'Back to Profile';
      if (state.from.startsWith('/home')) return 'Back to Home';
      return 'Back';
    }
    return 'Back';
  };

  const navigateToHome = () => {
    navigate(getHomeRoute());
  };

  return {
    navigateToHome,
    getHomeRoute,
    getBackLabel,
  };
}
