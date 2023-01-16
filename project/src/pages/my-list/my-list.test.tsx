import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import MyList from './my-list';
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


describe('my-list tests', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
        user: null
      },
      [ReducerName.Main]: {
        favoriteCount: mockFilms.length,
        favoriteFilms: mockFilms
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
