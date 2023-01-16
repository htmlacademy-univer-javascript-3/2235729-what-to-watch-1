import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthorizationsStatus from '../../types/authorization-status';
import PrivateRoute from './private-route';
import {ReducerName} from '../../types/reducer-name';

const mockStore = configureMockStore();
const initialEntries = ['/'];

describe('private-route tests', () => {
  beforeEach(() => {initialEntries.push('/private');});

  it('should render login when not authorized', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: { authorizationStatus: AuthorizationsStatus.NOT_AUTHORIZED },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path='/login' element={<h1>public</h1>}/>
            <Route path='/private' element={
              <PrivateRoute >
                <h1>private</h1>
              </PrivateRoute>
            }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/public/i)).toBeInTheDocument();
    expect(screen.queryByText(/private/i)).not.toBeInTheDocument();
  });

  it('should render private route when authorized', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: { authorizationStatus: AuthorizationsStatus.AUTHORIZED },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path='/login' element={<h1>public</h1>}/>
            <Route path='/private' element={
              <PrivateRoute>
                <h1>private</h1>
              </PrivateRoute>
            }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/private/i)).toBeInTheDocument();
    expect(screen.queryByText(/public/i)).not.toBeInTheDocument();
  });
});
