import {createReducer, Draft} from '@reduxjs/toolkit';
import films from '../mocks/films';
import Genre from '../types/genre';
import Film from '../types/film';

import {
  changeGenre
} from './actions';

type State = {
  genre: string;
  filmsList: Film[];
}

const initialState: State = {
  genre: Genre.DEFAULT_GENRE,
  filmsList: films,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state: Draft<State>, action: {payload: string}) => {
      state.genre = action.payload;
      state.filmsList = action.payload === Genre.DEFAULT_GENRE ? films : films.filter((film) => film.genre === action.payload);
    });
});
