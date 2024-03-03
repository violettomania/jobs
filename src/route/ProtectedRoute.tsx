import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/reduxHooksWrapper';
import { RootState } from '../state/store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userLoggedIn = useAppSelector(
    (state: RootState) => state.user.loggedIn
  );

  if (!userLoggedIn) {
    return <Navigate to='/landing' />;
  }
  return children;
};

export default ProtectedRoute;
