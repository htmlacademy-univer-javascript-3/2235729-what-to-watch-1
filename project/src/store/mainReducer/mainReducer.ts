import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../types/reducerName';
import Genre from '../../types/genre';
import Film from '../../types/film';

import {
  fetchFavoriteFilms, fetchFilms, fetchPromo
} from '../api-actions';
import {
  setError, setGenre
} from '../actions';

type State = {
  films: Film[];
  genreFilms: Film[];
  currentGenre: string;
  isFilmsLoading: boolean;
  error: null | string;
  promo: null | Film;
  favoriteFilms: Film[];
}

const initialState: State = {
  films: [],
  genreFilms: [],
  currentGenre: Genre.DEFAULT_GENRE,
  isFilmsLoading: false,
  error: null,
  promo: null,
  favoriteFilms: [],
};

export const mainReducer = createSlice({
  name: ReducerName.Main,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setGenre, (state, action) => {
        state.currentGenre = action.payload;
        state.genreFilms = action.payload === Genre.DEFAULT_GENRE ? state.films : state.films.filter((film) => film.genre === action.payload);
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchFilms.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.genreFilms = state.films;
        state.isFilmsLoading = false;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilms.rejected, (state, action) => {
        state.favoriteFilms = [];
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  },
});
