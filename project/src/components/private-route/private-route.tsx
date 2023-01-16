import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import AuthorizationStatus from '../../types/authorization-status';
import {ReducerName} from '../../types/reducer-name';

type PrivateRouteProps = {
  navigateTo: JSX.Element;
};

function PrivateRoute({navigateTo}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[ReducerName.Authorzation].authorizationStatus);
  return authorizationStatus === AuthorizationStatus.AUTHORIZED ? navigateTo : <Navigate to={'/login'} />;
}

export default PrivateRoute;
