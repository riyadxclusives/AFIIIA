import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  from?: string;
}

export function useAuthNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const getHomeRoute = () => {
    const state = location.state as LocationState | null;
    console.log('Navigation state:', state);
    console.log('From:', state?.from);
    return state?.from || '/';
  };

  const getBackLabel = () => {
    const state = location.state as LocationState | null;
    const from = state?.from;
    
    if (!from || from === '/') return 'Back';
    
    if (from === '/home/settings') return 'Back to Settings';
    if (from === '/home/profile') return 'Back to Profile';
    if (from === '/home/cycle') return 'Back to Cycle';
    if (from === '/home/mood') return 'Back to Mood';
    if (from === '/home/workout') return 'Back to Workout';
    if (from === '/home/meal') return 'Back to Meals';
    if (from === '/home') return 'Back to Home';
    if (from.startsWith('/home/')) return 'Back to Home';
    
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
