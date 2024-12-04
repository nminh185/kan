import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const requireAuth = () => {
    if (!user) {
      navigate('/');
      return false;
    }
    return true;
  };

  const requireAdmin = () => {
    if (!isAdmin()) {
      navigate('/');
      return false;
    }
    return true;
  };

  return {
    user,
    isAdmin,
    requireAuth,
    requireAdmin,
  };
}