import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import films from '../../mocks/films';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import GenreList from './genre-list';
import Genre from '../../types/genre';

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

describe('genre-list tests', () => {
  const store = mockStore({
    mainReducer: {
      films: mockFilms,
      currentGenre: mockFilm.genre,
    },
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <GenreList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(Genre.DEFAULT_GENRE)).toBeInTheDocument();
  });
});
