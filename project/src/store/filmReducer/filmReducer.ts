import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../types/reducerName';
import Film from '../../types/film';
import Review from '../../types/review';
import {
  setFavorite,
  fetchReviews,
  fetchFilm,
  fetchSimilar
} from '../api-actions';

type State = {
  film: Film | null;
  reviews: Review[];
  similar: Film[];
  isLoading: boolean;
}

const initialState: State = {
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
