import Film from '../../types/film';

type OverviewProps = {
  film: Film;
}

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


function Overview({film}: OverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingLevel(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
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
    </>);
}

export default Overview;
