import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import Film from '../types/film';
import Review from '../types/review';
import User from '../types/user';


export const fetchFilms = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>('/films');
    return data;
  },
);

export const checkAuth = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<User>('/login');
    return data;
  },
);

export const login = createAsyncThunk<User, {email: string; password: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>('/login', {email, password});
    return data;
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
  },
);

export const fetchFilm = createAsyncThunk<Film, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films/id',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`/films/${filmId}`);
    return data;
  },
);

export const fetchFavoriteFilms = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/favorite',
  async (_arg, { dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>('/favorite');
    return data;
  },
);

export const fetchPromo = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/promo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>('/promo');
    return data;
  },
);

export const fetchReviews = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/reviews',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(`/comments/${filmId}`);
    return data;
  },
);

export const fetchSimilar = createAsyncThunk<Film[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/films/id/similar',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(`/films/${filmId}/similar`);
    return data;
  },
);

export const setFavorite = createAsyncThunk<Film, {status: boolean; filmId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  '/favorite/id/status',
  async ({status, filmId}, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`/favorite/${filmId}/${status ? 1 : 0}`);
    return data;
  },
);

