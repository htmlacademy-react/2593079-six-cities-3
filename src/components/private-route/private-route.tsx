import { Location, Navigate, useLocation } from 'react-router-dom';
import { AuthorizationStatus, RoutePath } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getAuthStatus } from '../../store/auth/selectors';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

type FromState = {
    from?: string;
};

export default function PrivateRoute({children, onlyUnAuth}: PrivateRouteProps): JSX.Element {

  const location = useLocation() as Location<FromState> ;
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Spinner/>;
  }

  if(onlyUnAuth && authStatus === AuthorizationStatus.Auth) {
    const from = location.state?.from || RoutePath.Main;
    return <Navigate to={from} state={{from: from}}/>;
  }

  if(!onlyUnAuth && authStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={RoutePath.Login}/>;
  }

  return children;
}
