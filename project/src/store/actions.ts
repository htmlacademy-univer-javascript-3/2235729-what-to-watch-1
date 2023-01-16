import {createAction} from '@reduxjs/toolkit';
import Film from '../types/film';
import User from '../types/user';
import Review from '../types/review';

const Action = {
  SET_GENRE: 'SET_GENRE',
  SET_FILMS_LOAD_STATUS: 'SET_FILMS_LOAD_STATUS',
  SET_FILMS: 'SET_FILMS',
  SET_USER: 'SET_USER',
  SET_AUTHORIZATION_STATUS: 'SET_AUTHORIZATION_STATUS',
  SET_ERROR: 'SET_ERROR',
  SET_REVIEWS: 'SET_REVIEWS'
};

export const setGenre = createAction(Action.SET_GENRE, (genre: string) => ({payload: genre}));
export const setFilmsLoadStatus = createAction(Action.SET_FILMS_LOAD_STATUS, (status: boolean) => ({payload: status}));
export const setFilms = createAction(Action.SET_FILMS, (films: Film[]) => ({payload: films}));
export const setUser = createAction(Action.SET_USER, (user: User | null) => ({payload: user}));
export const setAuthorizationStatus = createAction(Action.SET_AUTHORIZATION_STATUS, (status: string) => ({payload: status}));
export const setError = createAction(Action.SET_ERROR, (error: string | null) => ({payload: error}));
export const setReviews = createAction(Action.SET_REVIEWS, (review: Review[]) => ({payload: review}));
