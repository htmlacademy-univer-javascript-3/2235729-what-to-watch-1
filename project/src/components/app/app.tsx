import MainPage from '../../pages/main-page/main-page';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchFavoriteFilms} from '../../store/api-actions';
import {ReducerName} from '../../types/reducerName';
import AuthorizationStatus from '../../types/authorizationStatus';

function App(): JSX.Element {
  const authStatus = useAppSelector((state) => state[ReducerName.Authorzation].authorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [authStatus, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<MainPage />)}/>
        <Route path='login' element={<SignIn />}/>
        <Route path='mylist' element={<PrivateRoute navigateTo={<MyList />} />}/>
        <Route path='films/:id/'>
          <Route index element={<MoviePage />} />
          <Route path='review' element={<AddReviewPage />}/>
        </Route>
        <Route path='player/:id' element={<Player />}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
