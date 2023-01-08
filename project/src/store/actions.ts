import {createAction} from '@reduxjs/toolkit';

const Action = {
  CHANGE_GENRE: 'CHANGE_GENRE'
};

export const changeGenre = createAction(Action.CHANGE_GENRE, (genre) => {return {payload: genre};});

