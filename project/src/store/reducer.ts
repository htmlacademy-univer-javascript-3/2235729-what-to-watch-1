import {createReducer} from '@reduxjs/toolkit';
import films from '../mocks/films';
import Genre from '../types/genre';

import {
  changeGenre
} from './actions';

const initialState = {
  genre: 0,
  filmsList: films,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload.genre;
    });
});
