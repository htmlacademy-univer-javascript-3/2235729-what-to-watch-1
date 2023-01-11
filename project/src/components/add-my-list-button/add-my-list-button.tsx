import {useAppSelector, useAppDispatch} from '../../hooks';
import {ReducerName} from '../../types/reducerName';
import {setFavorite} from '../../store/api-actions';

type AddMyListButtonProps = {
  filmId: number;
}

function AddMyListButton({filmId}: AddMyListButtonProps): JSX.Element {
  const myFilmsCount = useAppSelector((state) => state[ReducerName.Main].favoriteFilms).length;
  const isFavorite = useAppSelector((state) => state[ReducerName.Main].films).find((film) => film.id === filmId)?.isFavorite;
  const dispatch = useAppDispatch();
  return (
    <button className="btn btn--list film-card__button" type="button"
      onClick={() => {dispatch(setFavorite({status: !isFavorite, filmId: filmId.toString()}));}}>
      {
        isFavorite ?
          (<span>✓</span>) :
          (<svg viewBox="0 0 19 20" width="19" height="20"><use xlinkHref="#add"></use></svg>)
      }
      <span>My list</span>
      <span className="film-card__count">{myFilmsCount}</span>
    </button>);
}

export default AddMyListButton;
