import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import UserBlock from './user-block';
import {State} from '../../types/state';
import AuthorizationStatus from '../../types/authorization-status';
import {ReducerName} from '../../types/reducer-name';

jest.mock('../../services/error-handle.ts');
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

describe('user-block tests', () => {
  it('should render correctly when not authorized', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly when authorized', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.AUTHORIZED
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserBlock />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should redirect to login when not authorized', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path={'/login'} element={<text>Sign In</text>}/>
            <Route path='*' element={<UserBlock />}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loginLink = screen.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('should redirect correctly when auth', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.AUTHORIZED
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path={'/mylist'} element={<text>My list</text>}/>
            <Route path='*' element={<UserBlock />}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const avatar = screen.getByTestId('avatar');
    fireEvent.click(avatar);
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });
});
