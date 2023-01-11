import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../types/reducerName';
import { authorizationReducer } from './authorizationReducer/authorizationReduser';
import { filmReducer } from './filmReducer/filmReducer';
import { mainReducer } from './mainReducer/mainReducer';

export const reducer = combineReducers({
  [ReducerName.Film]: filmReducer.reducer,
  [ReducerName.Main]: mainReducer.reducer,
  [ReducerName.Authorzation]: authorizationReducer.reducer
});
