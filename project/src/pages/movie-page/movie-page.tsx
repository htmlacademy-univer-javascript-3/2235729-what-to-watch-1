import {Navigate, useParams} from 'react-router-dom';
import Film from '../../types/film';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {useAppSelector} from '../../hooks';


function getRatingLevel(rating: number) {
  if (rating <= 3) {
    return 'Bad';
  }
  if ((5 >= rating) && (rating > 3)) {
    return 'Normal';
  }
  if ((8 >= rating) && (rating > 5)) {
    return 'Good';
  }
  if ((10 > rating) && (rating > 8)) {
    return 'Very good';
  }
  if (rating === 10) {
    return 'Awesome';
  }
}


function MoviePage(): JSX.Element {
  const id = Number(useParams().id);
  const films = useAppSelector((state) => state.allFilms);
  const film = films.find((f) => f.id === id);
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

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="/#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="/#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="/#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{film.rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">{getRatingLevel(film.rating)}</span>
                  <span className="film-rating__count">240 ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>{film.description}</p>

                <p className="film-card__director"><strong>Director: {film.director}</strong></p>

                <p className="film-card__starring">
                  <strong>Starring: {film.starring.join(' ')} and other
                  </strong>
                </p>
              </div>
            </div>
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
  ) : <Navigate to={'/*'}/>;
}

export default MoviePage;
