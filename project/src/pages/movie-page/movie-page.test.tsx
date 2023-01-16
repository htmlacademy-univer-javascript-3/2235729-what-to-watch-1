import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import MoviePage from './movie-page';
import {State} from '../../types/state';
import AuthorizationStatus from '../../types/authorization-status';
import films from '../../mocks/films';
import {ReducerName} from '../../types/reducer-name';

jest.mock('../../services/error-handle.ts');
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const mockFilms = films;
const mockFilm = films[0];


describe('movie-page tests', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED
      },
      [ReducerName.Main]: {
        favoriteCount: mockFilms.length
      },
      [ReducerName.Film]: {
        film: mockFilm,
        similar: mockFilms
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviePage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });
  it('should render correctly when not authorized', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED
      },
      [ReducerName.Main]: {
        favoriteCount: mockFilms.length
      },
      [ReducerName.Film]: {
        film: mockFilm,
        similar: mockFilms
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/My List/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Add review/i)).not.toBeInTheDocument();
  });

  it('should render correctly when authorized', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
        user: null
      },
      [ReducerName.Main]: {
        favoriteCount: mockFilms.length
      },
      [ReducerName.Film]: {
        film: mockFilm,
        similar: mockFilms
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });
});
