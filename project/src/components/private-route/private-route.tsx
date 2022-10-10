import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  hasAccess: boolean;
  navigateTo: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  return props.hasAccess ? props.navigateTo : <Navigate to={'/login'} />;
}

export default PrivateRoute;
