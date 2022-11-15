import { useFirebase } from 'react-redux-firebase';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const useAuth = () => {
  const auth = useSelector(state => state.firebase.auth);

  const firebase = useFirebase();
  return {
    auth,
    login: ({ email, password }) => firebase.login({ email, password }),
    logout: () => firebase.logout(),
    createUser: ({ email, password }) =>
      firebase.createUser({ email, password }),
  };
};

export const PrivateRoutes = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return isLoaded(auth) && isEmpty(auth) ? (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  ) : (
    <Outlet />
  );
};

export const PublicRoute = () => {
  const { auth } = useAuth();

  return isLoaded(auth) && isEmpty(auth) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
