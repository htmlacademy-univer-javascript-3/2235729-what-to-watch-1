import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {ReducerName} from '../../types/reducer-name';
import AuthorizationStatus from '../../types/authorization-status';
import {fetchFavoriteFilms} from '../../store/api-actions';
import {Navigate} from 'react-router-dom';
import {useEffect} from 'react';


function MyList(): JSX.Element{
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, []);
  const favoriteFilms = useAppSelector((state) => state[ReducerName.Main].favoriteFilms);
  const authStatus = useAppSelector((state) => state[ReducerName.Authorzation].authorizationStatus);
  if (authStatus === AuthorizationStatus.NOT_AUTHORIZED) {
    return (<Navigate to="/login" />);
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">
          My list
          <span className="user-page__film-count">
            {favoriteFilms.length}
          </span>
        </h1>
        <UserBlock />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">
          Catalog
        </h2>
        <FilmsList films={favoriteFilms} />
      </section>
      <Footer />
    </div>
  );
}

export default MyList;
