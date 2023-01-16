import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import AuthorizationStatus from '../../types/authorization-status';
import {ReducerName} from '../../types/reducer-name';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[ReducerName.Authorzation].authorizationStatus);
  return authorizationStatus === AuthorizationStatus.AUTHORIZED ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
