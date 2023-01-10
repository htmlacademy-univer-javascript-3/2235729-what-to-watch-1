import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import AuthorizationStatus from '../../types/authorizationStatus';

type PrivateRouteProps = {
  navigateTo: JSX.Element;
};

function PrivateRoute({navigateTo}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return authorizationStatus === AuthorizationStatus.AUTHORIZED ? navigateTo : <Navigate to={'/login'} />;
}

export default PrivateRoute;
