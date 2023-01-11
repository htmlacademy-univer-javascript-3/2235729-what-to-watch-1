import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../types/reducerName';
import { dropToken, saveToken } from '../../services/token';
import User from '../../types/user';
import AuthorizationStatus from '../../types/authorizationStatus';
import { checkAuth, login, logout } from '../api-actions';

type stateType = {
  user: User | null;
  authorizationStatus: string;
}

const initialState: stateType = {
  authorizationStatus: AuthorizationStatus.NOT_AUTHORIZED,
  user: null
};

export const authorizationReducer = createSlice({
  name: ReducerName.Authorzation,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        dropToken();
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NOT_AUTHORIZED;
      })
      .addCase(login.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.AUTHORIZED;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.AUTHORIZED;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NOT_AUTHORIZED;
      });
  },
});
