import {createReducer} from '@reduxjs/toolkit';
import Genre from '../types/genre';
import Film from '../types/film';
import User from '../types/user';
import AuthorizationStatus from '../types/authorizationStatus';

import {
  setGenre,
  setFilmsLoadStatus,
  setFilms,
  setUser,
  setAuthorizationStatus,
  setError, 
  setPromoMovie, 
  setFavoriteFilms
} from './actions';

type State = {
  genre: string;
  allFilms: Film[];
  genreFilms: Film[];
  user: User | null;
  authorizationStatus: string;
  isLoadFilms: boolean;
  error: string | null;
  promoMovie: Film | null;
  favoriteFilms: Film[];
}

const initialState: State = {
  genre: Genre.DEFAULT_GENRE,
  promoMovie: null,
  allFilms: [],
  genreFilms: [],
  user: null,
  authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED,
  isLoadFilms: false,
  error: null,
  favoriteFilms: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action: { payload: string }) => {
      state.genre = action.payload;
      state.genreFilms = action.payload === Genre.DEFAULT_GENRE ? state.allFilms : state.allFilms.filter((film) => film.genre === action.payload);
    })
    .addCase(setFilms, (state, action: { payload: Film[] }) => {
      state.allFilms = action.payload;
    })
    .addCase(setUser, (state, action: { payload: User | null}) => {
      state.user = action.payload;
    })
    .addCase(setFilmsLoadStatus, (state, action: { payload: boolean }) => {
      state.isLoadFilms = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action: { payload: string }) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action: { payload: string | null }) => {
      state.error = action.payload;
    })
    .addCase(setPromoMovie, (state, action: {payload: Film | null}) => {
      state.promoMovie = action.payload;
    })
    .addCase(setFavoriteFilms, (state, action: {payload: Film[]}) => {
      state.favoriteFilms = action.payload;
    });
});
