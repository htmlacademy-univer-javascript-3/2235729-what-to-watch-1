import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {ReducerName} from '../../types/reducer-name';
import {fetchFavoriteFilms} from '../../store/api-actions';
import {useEffect} from 'react';


function MyList(): JSX.Element{
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);
  const favoriteFilms = useAppSelector((state) => state[ReducerName.Main].favoriteFilms);

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
