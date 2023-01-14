import {useAppSelector, useAppDispatch} from '../../hooks';
import {ReducerName} from '../../types/reducerName';
import {setFavorite} from '../../store/api-actions';
import {FormEvent} from 'react';

type AddMyListButtonProps = {
  filmId: number;
  isFavorite: boolean;
}

function AddMyListButton({filmId, isFavorite}: AddMyListButtonProps): JSX.Element {
  const myFilmsCount = useAppSelector((state) => state[ReducerName.Main].favoriteFilms).length;
  const dispatch = useAppDispatch();

  function handleSetfavorite(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(setFavorite({status: !isFavorite, filmId: filmId.toString()}));
  }

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleSetfavorite}>
      {
        isFavorite ?
          (<svg viewBox="0 0 19 20" width="19" height="20"><use xlinkHref="#in-list" /></svg> ) :
          (<svg viewBox="0 0 19 20" width="19" height="20"><use xlinkHref="#add" /></svg>)
      }
      <span>My list</span>
      <span className="film-card__count">{myFilmsCount}</span>
    </button>);
}

export default AddMyListButton;
