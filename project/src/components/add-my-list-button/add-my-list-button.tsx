import {useAppSelector} from  '../../hooks';
import {ReducerName} from '../../types/reducerName';

type AddMyListButtonProps = {
  filmId: number;
  isFavorite: boolean;
}

function AddMyListButton({filmId, isFavorite}: AddMyListButtonProps): JSX.Element {
  const myFilmsCount = useAppSelector((state) => state[ReducerName.Main].favoriteFilms).length;
  return (
    <button className="btn btn--list film-card__button" type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{myFilmsCount}</span>
    </button>);
}

export default AddMyListButton;
