import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logout} from '../../store/api-actions';
import AuthorizationStatus from '../../types/authorizationStatus';
import {ReducerName} from '../../types/reducerName';


function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state[ReducerName.Authorzation].user);
  const authStatus = useAppSelector((state) => state[ReducerName.Authorzation].authorizationStatus);
  return authStatus === AuthorizationStatus.AUTHORIZED ?
    (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to={'/mylist'}>
              <img src={user !== null ? user.avatarUrl : '/#'} alt="User avatar" width="63" height="63"/>
            </Link>
          </div>
        </li>
        <li className="user-block__item">
          <Link to='/login' className="user-block__link" onClick={() => {dispatch(logout());}}>Sign out</Link>
        </li>
      </ul>
    ) :
    (
      <div className="user-block">
        <Link to={'/login'} className="user-block__link">Sign in</Link>
      </div>
    );
}

export default UserBlock;
