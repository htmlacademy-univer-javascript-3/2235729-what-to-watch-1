import AuthorizationReducerState from '../../types/authorization-reducer-state';
import AuthorizationStatus from '../../types/authorization-status';
import {authorizationReducer} from './authorization-reduser';
import {checkAuth, login, logout} from '../api-actions';
import User from '../../types/user';


const mockUser: User = {email: '123', id: 1, avatarUrl: '1234', name: 'test', token: 'testtest'};

describe('film-reducer', () => {
  let state: AuthorizationReducerState;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED,
      user: null
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(authorizationReducer.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED,
        user: null
      });
  });

  describe('login test', () => {
    it('should set authorizationStatus AUTHORIZED on fulfilled', () => {
      expect(authorizationReducer.reducer(state, {type: login.fulfilled.type, payload: mockUser}).authorizationStatus)
        .toEqual(AuthorizationStatus.AUTHORIZED);
    });
    it('should set user on fulfilled', () => {
      expect(authorizationReducer.reducer(state, { type: login.fulfilled.type, payload: mockUser}).user)
        .toEqual(mockUser);
    });
  });

  describe('logout test', () => {
    it('should set user null on fulfilled', () => {
      expect(authorizationReducer.reducer(state, { type: logout.fulfilled.type}).user)
        .toEqual(null);
    });
    it('should set authorizationStatus NOT_AUTHORIZED on fulfilled', () => {
      expect(authorizationReducer.reducer(state, {type: logout.fulfilled.type}).authorizationStatus)
        .toEqual(AuthorizationStatus.NOT_AUTHORIZED);
    });
  });

  describe('checkAuth test', () => {
    it('should set user on fulfilled', () => {
      expect(authorizationReducer.reducer(state, { type: checkAuth.fulfilled.type, payload: mockUser }).user)
        .toMatchObject(mockUser);
    });
    it('should set authorizationStatus AUTHORIZED on fulfilled', () => {
      expect(authorizationReducer.reducer(state, {type: checkAuth.fulfilled.type, payload: mockUser}).authorizationStatus)
        .toEqual(AuthorizationStatus.AUTHORIZED);
    });
    it('should set authorizationStatus NOT_AUTHORIZED on rejected', () => {
      expect(authorizationReducer.reducer(state, {type: checkAuth.rejected.type, payload: mockUser}).authorizationStatus)
        .toEqual(AuthorizationStatus.NOT_AUTHORIZED);
    });
  });
});
