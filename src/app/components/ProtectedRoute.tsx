import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
  adminOnly?: boolean;
}

export function ProtectedRoute({
  children,
  requireSubscription = false,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requireSubscription && user?.subscriptionStatus !== 'active' && !isAdmin) {
    return <Navigate to="/subscribe" replace />;
  }

  return <>{children}</>;
}
