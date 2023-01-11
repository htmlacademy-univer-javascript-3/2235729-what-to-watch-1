import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {useAppSelector, useAppDispatch} from '../../hooks';
import MoviePageTabs from '../../components/movie-page-tabs/movie-page-tabs';
import {ReducerName} from '../../types/reducerName';
import {fetchSimilar, fetchReviews, fetchFilm} from '../../store/api-actions';
import NotFoundPage from '../not-found-page/not-found-page';


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
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">Add review</a>
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
          <FilmsList films={[]}/>
        </section>

        <Footer />
      </div>
    </>
  ) : <NotFoundPage />;
}

export default MoviePage;
