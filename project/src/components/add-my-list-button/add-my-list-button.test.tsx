import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {State} from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import films from '../../mocks/films';
import {ReducerName} from '../../types/reducer-name';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AddMyListButton from './add-my-list-button';

jest.mock('../../services/error-handle.ts');

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const mockFilm = films[0];

describe('add-my-list-button tests', () => {
  it('should correctly display my list films count', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        favoriteCount: 2
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddMyListButton filmId={mockFilm.id} isFavorite={mockFilm.isFavorite} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });
});
