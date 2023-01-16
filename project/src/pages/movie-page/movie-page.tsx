import {useParams, Link} from 'react-router-dom';
import React, {useEffect} from 'react';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {useAppSelector, useAppDispatch} from '../../hooks';
import MoviePageTabs from '../../components/movie-page-tabs/movie-page-tabs';
import {ReducerName} from '../../types/reducer-name';
import {fetchSimilar, fetchReviews, fetchFilm} from '../../store/api-actions';
import NotFoundPage from '../not-found-page/not-found-page';
import PlayButton from '../../components/play-button/play-button';
import AddMyListButton from '../../components/add-my-list-button/add-my-list-button';
import AuthorizationStatus from '../../types/authorization-status';
import Loading from '../../components/loading/loading';


function MoviePage(): JSX.Element {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilm(id.toString()));
    dispatch(fetchSimilar(id.toString()));
    dispatch(fetchReviews(id.toString()));
  }, [id, dispatch]);

  const film = useAppSelector((state) => state[ReducerName.Film].film);
  const reviews = useAppSelector((state) => state[ReducerName.Film].reviews);
  const similar = useAppSelector((state) => state[ReducerName.Film].similar);
  const authStatus = useAppSelector((state) => state[ReducerName.Authorzation].authorizationStatus);
  const isLoading = useAppSelector((state) => state[ReducerName.Film].isLoading);

  if (isLoading) {
    return (<Loading />);
  }

  return film ? (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton filmId={film.id}/>
                {
                  authStatus === AuthorizationStatus.AUTHORIZED && (
                    <>
                      <AddMyListButton filmId={film.id} isFavorite={film.isFavorite} />
                      <Link to="review" className="btn film-card__button">Add review</Link>
                    </>)
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`}
                width="218" height="327"
              />
            </div>
            <MoviePageTabs film={film} reviews={reviews}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={similar}/>
        </section>
        <Footer />
      </div>
    </>
  ) : <NotFoundPage />;
}

export default MoviePage;
