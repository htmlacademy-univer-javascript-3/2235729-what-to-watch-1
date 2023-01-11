import {useAppDispatch, useAppSelector} from '../../hooks';
import {setGenre} from '../../store/actions';
import {FormEvent} from 'react';
import {ReducerName} from '../../types/reducerName';
import Genre from '../../types/genre';

function GenreList(): JSX.Element {
  const currentGenre = useAppSelector((state) => state[ReducerName.Main].currentGenre);
  const films = useAppSelector((state) => state[ReducerName.Main].films);
  const dispatch = useAppDispatch();
  function GetGenres() {
    const res = Array.from(new Set(films.map((film) => film.genre)));
    return [Genre.DEFAULT_GENRE].concat(res);
  }
  function updateGenre(event: FormEvent<HTMLAnchorElement>) {
    event.preventDefault();
    dispatch(setGenre(event.currentTarget.id));
  }

  return (
    <ul className="catalog__genres-list">
      {
        GetGenres().map((genre) => (
          <li className={`catalog__genres-item${genre === currentGenre ? ' catalog__genres-item--active' : ''}`} key={genre}>
            <a href="/#" className="catalog__genres-link" id={genre} onClick={updateGenre}>{genre}</a>
          </li>))
      }
    </ul>);
}

export default GenreList;
