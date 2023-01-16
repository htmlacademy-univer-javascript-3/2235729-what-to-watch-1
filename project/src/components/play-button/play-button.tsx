import {Link} from 'react-router-dom';

type PlayButtonProps = {
  filmId: number;
}


function PlayButton({filmId}: PlayButtonProps): JSX.Element {
  return (
    <Link to={`/player/${filmId}`} className="btn btn--play film-card__button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"/>
      </svg>
      <span>Play</span>
    </Link>);
}

export default PlayButton;
