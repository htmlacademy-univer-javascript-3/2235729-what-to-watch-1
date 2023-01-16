import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import MainPage from './main-page';
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


describe('main tests', () => {
  it('should render correctly when not authorized', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED
      },
      [ReducerName.Main]: {
        films: mockFilms,
        genreFilms: mockFilms,
        promo: mockFilm,
        favoriteFilms: mockFilms,
        favoriteCount: mockFilms.length,
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/My List/i)).not.toBeInTheDocument();
  });

  it('should render correctly when authorized', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
        user: null
      },
      [ReducerName.Main]: {
        films: mockFilms,
        genreFilms: mockFilms,
        promo: mockFilm,
        favoriteFilms: mockFilms,
        favoriteCount: mockFilms.length,
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
  });
});
