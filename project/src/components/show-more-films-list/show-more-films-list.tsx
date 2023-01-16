import FilmsList from '../films-list/films-list';
import Film from '../../types/film';
import {useState, FormEvent, useEffect} from 'react';
type ShowMoreFilmsListProps = {
  films: Film[];
}

function ShowMoreFilmsList({films}: ShowMoreFilmsListProps): JSX.Element {
  const SHOW_COUNT = 8;
  const [showCount, setShowCount] = useState(SHOW_COUNT);
  useEffect(() => {
    setShowCount(SHOW_COUNT);
  }, [films]);
  function addShowCountHandle(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setShowCount(Math.min(showCount + SHOW_COUNT, films.length));
  }
  return (
    <>
      <FilmsList films={films.slice(0, showCount)}/>
      {
        (showCount < films.length) && (
          <div className="catalog__more">
            <button className="catalog__button" type="button" onClick={addShowCountHandle} data-testid="show-more">
              Show more
            </button>
          </div>)
      }
    </>);
}

export default ShowMoreFilmsList;
