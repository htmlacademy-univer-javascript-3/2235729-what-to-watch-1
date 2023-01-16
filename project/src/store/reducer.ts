import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../types/reducer-name';
import { authorizationReducer } from './authorization-reducer/authorization-reduser';
import { filmReducer } from './film-reducer/film-reducer';
import { mainReducer } from './main-reducer/main-reducer';

export const reducer = combineReducers({
  [ReducerName.Film]: filmReducer.reducer,
  [ReducerName.Main]: mainReducer.reducer,
  [ReducerName.Authorzation]: authorizationReducer.reducer
});
