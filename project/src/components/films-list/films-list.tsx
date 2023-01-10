import Film from '../../types/film';
import SmallFilmCard from '../small-film-card/small-film-card';
import {useState} from 'react';

type FilmListProps = {
  films: Film[];
}

function FilmsList({films}: FilmListProps): JSX.Element{
  const [activeCard, setActiveCard] = useState(0);

  const changeActiveCard = (filmId: number) => {
    if (activeCard !== filmId) {
      setActiveCard(filmId);
    }
  };

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <SmallFilmCard
          key={film.name}
          id={film.id}
          title={film.name}
          srcImg={film.previewImage}
          srcPreviewVideo={film.previewVideoLink}
          isHovered={activeCard === film.id}
          mouseOverHandler={() => changeActiveCard(film.id)}
          mouseLeaveHandler={() => changeActiveCard(0)}
        />))}
    </div>
  );
}

export default FilmsList;
