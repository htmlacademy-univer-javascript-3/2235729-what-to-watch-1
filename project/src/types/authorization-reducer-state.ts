import User from '../types/user';


type AuthorizationReducerState = {
  user: User | null;
  authorizationStatus: string;
}

export default AuthorizationReducerState;
