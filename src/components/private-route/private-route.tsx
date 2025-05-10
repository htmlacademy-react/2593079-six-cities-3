import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
}

const hasAccess = false;


export default function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  return hasAccess ? children : <Navigate to="/login" />;
}
