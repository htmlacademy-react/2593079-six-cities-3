import { Location, Navigate, useLocation } from 'react-router-dom';
import { AuthorizationStatus, RoutePath } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getAuthStatus } from '../../store/auth/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

type FromState = {
    from?: string;
};

export default function PrivateRoute({children, onlyUnAuth}: PrivateRouteProps): JSX.Element {

  const location = useLocation() as Location<FromState> ;
  const isAuthorized = useAppSelector(getAuthStatus) === AuthorizationStatus.Auth;

  if(onlyUnAuth && isAuthorized) {
    const from = location.state?.from || RoutePath.Main;
    return <Navigate to={from} state={{from: from}}/>;
  }

  if(!onlyUnAuth && !isAuthorized) {
    return <Navigate to={RoutePath.Login}/>;
  }

  return children;
}
