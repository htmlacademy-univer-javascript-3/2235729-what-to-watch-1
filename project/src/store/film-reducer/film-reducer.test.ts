import FilmState from '../../types/film-reducer-state';
import films from '../../mocks/films';
import { filmReducer } from './film-reducer';
import { fetchReviews, fetchFilm, fetchSimilar } from '../api-actions';
import reviews from '../../mocks/reviews';

const mockFilm = films[0];
const mockFilms = films;
const mockReviews = reviews;

describe('film-reducer', () => {
  let state: FilmState;

  beforeEach(() => {
    state = {
      film: null,
      similar: [],
      isLoading: false,
      reviews: []
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmReducer.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        film: null,
        similar: [],
        isLoading: false,
        reviews: []
      });
  });

  describe('fetchFilm test', () => {
    it('should set isLoading on pending', () => {
      expect(filmReducer.reducer(state, {type: fetchFilm.pending.type, payload: mockFilm}).isLoading)
        .toEqual(true);
    });
    it('should load film on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchFilm.fulfilled.type, payload: mockFilm }).film)
        .toEqual(mockFilm);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchFilm.fulfilled.type, payload: mockFilm }).isLoading)
        .toEqual(false);
    });
  });

  describe('fetchSimilar test', () => {
    it('should load similar films on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchSimilar.fulfilled.type, payload: mockFilms }).similar)
        .toEqual(mockFilms);
    });
  });

  describe('fetchReviews test', () => {
    it('should load reviews on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchReviews.fulfilled.type, payload: mockReviews }).reviews)
        .toMatchObject(mockReviews);
    });
  });
});
