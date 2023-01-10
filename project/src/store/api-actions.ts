import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import Film from '../types/film';
import {
  setFilms,
  setFilmsLoadStatus,
  setError,
  setAuthorizationStatus,
  setUser,
  setFavoriteFilms, 
  setPromoMovie
} from './actions';
import AuthorizationStatus from '../types/authorizationStatus';
import {store} from './index';
import {useNavigate} from 'react-router-dom';
import User from '../types/user';
import {dropToken, saveToken} from '../services/token';

export const nullifyError = createAsyncThunk('nullifyError',
  () => setTimeout(() => store.dispatch(setError(null)), 2000),);

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  '/films',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoadStatus(true));
    const {data} = await api.get<Film[]>('/films');
    dispatch(setFilms(data));
    dispatch(setFilmsLoadStatus(false));
  },
);

export const checkAuth = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  '/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setAuthorizationStatus(AuthorizationStatus.IN_PROCESS));
    try {
      const {data} = await api.get<User>('/login');
      dispatch(setUser(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NOT_AUTHORIZED));
    }
  },
);

export const login = createAsyncThunk<void, {email: string, password: string}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  '/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>('/login', {email, password});
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  '/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NOT_AUTHORIZED));
    dispatch(setUser(null));
  },
);

export const fetchFilmByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilmById',
  async (filmId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`/films/${filmId}`);
  },
);

export const fetchFavoriteFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilmsAction',
  async (_arg, { dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>('/favorite');
    dispatch(setFavoriteFilms(data));
  },
);

export const fetchPromo = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>('/promo');
    dispatch(setPromoMovie(data));
  },
);
