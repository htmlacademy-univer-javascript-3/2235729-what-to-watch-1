import FilmsList from '../../components/films-list/films-list';
import GenreList from '../../components/genre-list/genre-list';
import {useAppSelector} from '../../hooks';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';


function MainPage(): JSX.Element {
  const films = useAppSelector((state) => state.genreFilms);
  const promoMovie = useAppSelector((state) => state.promoMovie);
  const myFilmsCount = useAppSelector((state) => state.favoriteFilms).length;
  if (promoMovie === null) {
    return <></>
  }
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoMovie.backgroundImage} alt={promoMovie.name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoMovie.posterImage} alt={`${promoMovie.name} poster`}
                   width="218" height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoMovie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoMovie.genre}</span>
                <span className="film-card__year">{promoMovie.released}</span>
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
                  <span className="film-card__count">{myFilmsCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList />
          <FilmsList films={films}/>
          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainPage;
