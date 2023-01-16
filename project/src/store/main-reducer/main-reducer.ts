import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../types/reducer-name';
import Genre from '../../types/genre';
import MainReducerState from '../../types/main-reducer-state';
import {fetchFavoriteFilms, fetchFilms, fetchPromo, setFavorite} from '../api-actions';
import {setError, setGenre} from '../actions';

const initialState: MainReducerState = {
  films: [],
  genreFilms: [],
  currentGenre: Genre.DEFAULT_GENRE,
  isFilmsLoading: false,
  error: null,
  promo: null,
  favoriteFilms: [],
  favoriteCount: 0
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
        state.favoriteCount = action.payload.length;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.favoriteFilms = [];
        state.favoriteCount = 0;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        if (state.promo && action.payload.id === state.promo.id) {
          state.promo = action.payload;
        }
        state.favoriteCount += action.payload.isFavorite ? 1 : -1;
      });
  },
});
