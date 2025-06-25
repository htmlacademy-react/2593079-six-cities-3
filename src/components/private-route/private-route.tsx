import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, RoutePath } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getAuthStatus } from '../../store/auth/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(getAuthStatus) === AuthorizationStatus.Auth;
  return isAuthorized ? children : <Navigate to={RoutePath.Login} />;
}
