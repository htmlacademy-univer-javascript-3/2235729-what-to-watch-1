import Film from './film';

type MainReducerState = {
  films: Film[];
  genreFilms: Film[];
  currentGenre: string;
  isFilmsLoading: boolean;
  error: null | string;
  promo: null | Film;
  favoriteFilms: Film[];
  favoriteCount: number;
}

export default MainReducerState;
