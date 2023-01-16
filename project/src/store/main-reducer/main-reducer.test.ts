import MainState from '../../types/main-reducer-state';
import films from '../../mocks/films';
import {mainReducer} from './main-reducer';
import Genre from '../../types/genre';
import { fetchFilms, fetchFavoriteFilms, fetchPromo } from '../api-actions';
import {setGenre, setError} from '../actions';

const mockFilm = films[0];
const mockFilms = films;

describe('main-reducer', () => {
  let state: MainState;

  beforeEach(() => {
    state = {
      promo: null,
      favoriteFilms: [],
      genreFilms: [],
      currentGenre: Genre.DEFAULT_GENRE,
      isFilmsLoading: false,
      error: null,
      films: [],
      favoriteCount: 0
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(mainReducer.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        promo: null,
        favoriteFilms: [],
        genreFilms: [],
        currentGenre: Genre.DEFAULT_GENRE,
        isFilmsLoading: false,
        error: null,
        films: [],
        favoriteCount: 0
      });
  });

  describe('setGenre test', () => {
    it('should set genre', () => {
      expect(mainReducer.reducer(state, {type: setGenre.type, payload: mockFilm.genre}).currentGenre)
        .toEqual(mockFilm.genre);
    });
    it('setGenre should set genre films', () => {
      expect(mainReducer.reducer(state, {type: setGenre.type, payload: mockFilm.genre}).genreFilms)
        .toEqual([]);
    });
  });

  describe('setError test', () => {
    it('should set error', () => {
      expect(mainReducer.reducer(state, {type: setError.type, payload: '123'}).error)
        .toEqual('123');
    });
  });

  describe('fetchFilms test', () => {
    it('should set isLoading true on pending', () => {
      expect(mainReducer.reducer(state, {type: fetchFilms.pending.type, payload: mockFilms}).isFilmsLoading)
        .toEqual(true);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(mainReducer.reducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}).isFilmsLoading)
        .toEqual(false);
    });
    it('should set films on fulfilled', () => {
      expect(mainReducer.reducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}).films)
        .toEqual(mockFilms);
    });
    it('should set genre films equal films on fulfilled', () => {
      expect(mainReducer.reducer(state, {type: fetchFilms.fulfilled.type, payload: mockFilms}).genreFilms)
        .toEqual(mockFilms);
    });
  });

  describe('fetchFavoriteFilms test', () => {
    it('should set favorite films on fulfilled', () => {
      expect(mainReducer.reducer(state, {type: fetchFavoriteFilms.fulfilled.type, payload: mockFilms}).favoriteFilms)
        .toEqual(mockFilms);
    });
    it('should set favorite films empty on rejected', () => {
      expect(mainReducer.reducer(state, {type: fetchFavoriteFilms.rejected.type, payload: mockFilms}).favoriteFilms)
        .toEqual([]);
    });
  });

  describe('fetchPromo test', () => {
    it('should set promo on fulfilled', () => {
      expect(mainReducer.reducer(state, {type: fetchPromo.fulfilled.type, payload: mockFilm}).promo)
        .toEqual(mockFilm);
    });
  });
});
