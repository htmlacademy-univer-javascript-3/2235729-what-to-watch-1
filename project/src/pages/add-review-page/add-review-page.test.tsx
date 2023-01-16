import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import films from '../../mocks/films';
import { createAPI } from '../../services/api';
import AddReviewPage from './add-review-page';
import AuthorizationStatus from '../../types/authorization-status';
import {State} from '../../types/state';
import {ReducerName} from '../../types/reducer-name';


jest.mock('../../services/error-handle.ts');
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);
const mockFilm = films[0];

describe('add-review tests', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.AUTHORIZED,
        user: null
      },
      [ReducerName.Film]: {
        film: mockFilm,
      },
      [ReducerName.Main]: {
        isFilmsLoading: false
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddReviewPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Add Review/i)).toBeInTheDocument();
  });
});
