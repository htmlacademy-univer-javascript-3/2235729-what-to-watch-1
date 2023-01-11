import FilmsList from '../films-list/films-list';
import Film from '../../types/film';
import {useState, FormEvent, Fragment} from 'react';

type ShowMoreFilmsListProps = {
  films: Film[];
}

function ShowMoreFilmsList({films}: ShowMoreFilmsListProps): JSX.Element {
  const plusShowCount = 8;
  const [showCount, setShowCount] = useState(plusShowCount);
  
  function addShowCountHandle(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setShowCount(Math.min(showCount + plusShowCount, films.length));
  }
  
  return (
    <>
      <FilmsList films={films.slice(0, showCount)}/>
      {
        (showCount !== films.length) ? (
          <div className="catalog__more">
            <button className="catalog__button" type="button" onClick={addShowCountHandle}>Show more</button>
          </div>) : 
          (<Fragment />)
      }
    </>);
}

export default ShowMoreFilmsList;
