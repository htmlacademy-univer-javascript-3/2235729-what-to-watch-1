import Genre from '../../types/genre';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setGenre} from '../../store/actions';
import {FormEvent} from 'react';
function GenreList(): JSX.Element {
  const currentGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();
  function GetGenres() {
    const genres: string[] = [];
    for (const key in Genre) {
      genres.push(Genre[key as keyof typeof Genre]);
    }
    return genres;
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
