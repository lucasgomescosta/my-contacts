import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function AuthGuard({ isPrivate, children }) {
  const { signedIn } = useAuth();

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

AuthGuard.propTypes = {
  isPrivate: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
