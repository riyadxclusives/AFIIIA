import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function useAuthNavigation() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navigateToHome = () => {
    navigate(isAuthenticated ? '/home' : '/');
  };

  const getHomeRoute = () => {
    return isAuthenticated ? '/home' : '/';
  };

  return {
    navigateToHome,
    getHomeRoute,
    isAuthenticated,
  };
}
