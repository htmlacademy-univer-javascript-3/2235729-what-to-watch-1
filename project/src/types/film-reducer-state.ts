import Film from './film';
import Review from './review';


type FilmReducerState = {
  film: Film | null;
  reviews: Review[];
  similar: Film[];
  isLoading: boolean;
}

export default FilmReducerState;
