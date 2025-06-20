import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, RoutePath } from '../../const';
import { useAppSelector } from '../../hooks/store';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.authorizationStatus) === AuthorizationStatus.Auth;
  return isAuthorized ? children : <Navigate to={RoutePath.Login} />;
}
