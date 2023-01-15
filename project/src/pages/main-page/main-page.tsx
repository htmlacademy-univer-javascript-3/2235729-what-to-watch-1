import ShowMoreFilmsList from '../../components/show-more-films-list/show-more-films-list';
import GenreList from '../../components/genre-list/genre-list';
import {useAppSelector, useAppDispatch} from '../../hooks';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {ReducerName} from '../../types/reducerName';
import React, {useEffect} from 'react';
import PlayButton from '../../components/play-button/play-button';
import AddMyListButton from '../../components/add-my-list-button/add-my-list-button';
import {fetchPromo} from '../../store/api-actions';
import Loading from '../../components/loading/loading';
import AuthorizationStatus from '../../types/authorizationStatus';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);
  const films = useAppSelector((state) => state[ReducerName.Main].genreFilms);
  const promo = useAppSelector((state) => state[ReducerName.Main].promo);
  const authStatus = useAppSelector((state) => state[ReducerName.Authorzation].authorizationStatus);
  if (promo === null) {
    return (<Loading />);
  }
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promo.backgroundImage} alt={promo.name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promo.posterImage} alt={`${promo.name} poster`}
                width="218" height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promo.genre}</span>
                <span className="film-card__year">{promo.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton filmId={promo.id}/>
                {
                  authStatus === AuthorizationStatus.AUTHORIZED &&
                  (<AddMyListButton filmId={promo.id} isFavorite={promo.isFavorite}/>)
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList />
          <ShowMoreFilmsList films={films}/>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
