import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../types/reducer-name';
import FilmReducerState from '../../types/film-reducer-state';
import {
  setFavorite,
  fetchReviews,
  fetchFilm,
  fetchSimilar
} from '../api-actions';

const initialState: FilmReducerState = {
  film: null,
  reviews: [],
  similar: [],
  isLoading: false,
};

export const filmReducer = createSlice({
  name: ReducerName.Film,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  },
});
