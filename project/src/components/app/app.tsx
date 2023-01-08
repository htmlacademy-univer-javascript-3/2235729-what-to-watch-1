import MainPage from '../../pages/main-page/main-page';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import MoviePage from '../../pages/movie-page/movie-page';
import Player from '../../pages/player/player';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import Film from '../../types/film';

type MainPageProps = {
  title: string;
  genre: string;
  date: string;
  films: Film[];
}

function App({title, genre, date, films}: MainPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<MainPage filmTitle={title} filmGenre={genre} filmDate={date} films={films} key={title}/>)}/>
        <Route path='login' element={<SignIn />}/>
        <Route path='mylist' element={<PrivateRoute hasAccess={false} navigateTo={<MyList myFilms={films}/>} />}/>
        <Route path='films/:id/'>
          <Route index element={<MoviePage films={films}/>} />
          <Route path='review' element={<AddReviewPage films={films}/>}/>
        </Route>
        <Route path='player/:id' element={<Player films={films}/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
