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
import PlayButton from '../../components/play-button/play-button';
import AddMyListButton from '../../components/add-my-list-button/add-my-list-button';


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
  const favoriteCount = useAppSelector((state) => state[ReducerName.Main].favoriteFilms).length;

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
                <AddMyListButton filmId={film.id} isFavorite={film.isFavorite}/>
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
          <FilmsList films={similar}/>
        </section>

        <Footer />
      </div>
    </>
  ) : <NotFoundPage />;
}

export default MoviePage;
